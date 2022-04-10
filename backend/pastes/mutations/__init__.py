# 3rd-Party
import graphene
from mutations.add_attachment import AddAttachment
from mutations.add_paste_bin import AddPasteBin
from mutations.delete_attachement import DeleteAttachment
from mutations.delete_paste_bin import DeletePasteBin
from mutations.highlight import HighlightPasteBin, HighlightPreview


class PasteBinMutation(graphene.ObjectType):
    add_paste_bin = AddPasteBin.Field()
    delete_paste_bin = DeletePasteBin.Field(
        description="Mutation that is responsible for deleting pastes"
    )
    highlight_paste_bin = HighlightPasteBin.Field()
    highlight_preview = HighlightPreview.Field()
    add_attachment = AddAttachment.Field(description="Add an attachment to a paste")
    delete_attachment = DeleteAttachment.Field(description="Delete an attachment")
