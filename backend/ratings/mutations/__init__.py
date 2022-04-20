import graphene

from ratings.mutations.rating_paste import RatingPaste, RatingPasteID

class RatingMutation(graphene.ObjectType):
    rate_paste = RatingPaste.Field()
    rate_paste_id = RatingPasteID.Field()