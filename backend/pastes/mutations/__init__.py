# 3rd-Party
import graphene

# Local
from .add_attachment import AddAttachment
from .add_paste_bin import AddPasteBin
from .add_tag import AddTag
from .delete_attachement import DeleteAttachment
from .delete_paste_bin import DeletePasteBin
from .edit_paste_bin import EditPasteBin
from .highlight import HighlightPasteBin, HighlightPreview


class PasteBinMutation(graphene.ObjectType):
    add_paste_bin = AddPasteBin.Field()
    delete_paste_bin = DeletePasteBin.Field(
        description="Mutation that is responsible for deleting pastes"
    )
    highlight_paste_bin = HighlightPasteBin.Field()
    highlight_preview = HighlightPreview.Field()
    add_attachment = AddAttachment.Field(description="Add an attachment to a paste")
    delete_attachment = DeleteAttachment.Field(description="Delete an attachment")
    add_tag = AddTag.Field(description="manually add a new tag")
    edit_paste = EditPasteBin.Field()
