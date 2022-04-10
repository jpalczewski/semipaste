# Standard Library
import logging

# 3rd-Party
import graphene
from models import Attachment, PasteBin

# Project
from backend.mixins import ResultMixin

logger = logging.getLogger(__file__)


class AddAttachment(ResultMixin, graphene.ClientIDMutation):
    class Input:
        token = graphene.String(required=True, description="Upload token")
        description = graphene.String(description="Image description")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):  # type: ignore
        token = input['token']
        logger.debug(f"Received add attachment request with token {token}")
        file = info.context.FILES['image']
        if len(info.context.FILES) != 0:
            logger.debug(f"Received files {file}")
        else:
            return AddAttachment(ok=False, error="No files provided")

        try:
            paste = PasteBin.objects.get(attachment_token=token)

            if not paste.is_uploading_attachments_allowed():
                return AddAttachment(
                    ok=False, error="Too late to upload attachment to that paste"
                )

            attachment = Attachment.objects.create(paste=paste, image=file)
            attachment.save()
            print(vars(attachment))
            logger.debug(f"Attachment saved: {attachment}")
            return AddAttachment(ok=True, error=attachment)
        except PasteBin.DoesNotExist:
            return AddAttachment(ok=False, error="Invalid token")
        except Exception as e:
            return AddAttachment(ok=False, error=f"{e}")
        return AddAttachment(ok=False, error="Something went wrong")
