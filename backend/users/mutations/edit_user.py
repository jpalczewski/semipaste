# Django
from django.utils.html import escape, strip_tags

# 3rd-Party
import graphene

# Project
from backend.mixins import ErrorCode, ResultMixin
from users.models import User


class EditUser(ResultMixin, graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        description = graphene.String()
        password = graphene.String()

    @staticmethod
    def mutate(root, info, id: graphene.ID, **kwargs):  # type: ignore
        # type: ignore
        try:
            user = User.objects.get(pk=id)
        except User.DoesNotExist:
            return EditUser(
                ok=False,
                error_code=ErrorCode.USER_NOT_FOUND,
                error="User with specified ID not found",
            )
        for attr in kwargs.keys():

            value = kwargs.get(attr, getattr(user, attr))
            if value != '':
                if attr == 'description':
                    setattr(user, attr, strip_tags(escape(value)))
                elif attr == 'password':
                    user.set_password(value)
                else:
                    setattr(user, attr, value)
        user.save()
        return EditUser(ok=True, user=info.context.user)
