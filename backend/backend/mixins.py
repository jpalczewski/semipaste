# 3rd-Party
import graphene


class ErrorCode(graphene.Enum):
    NONEXISTENTPASTE = 1
    NOTLOGGEDIN = 2
    PERMISSIONDENIED = 3
    OPERATIONFAILED = 4
    EXCEPTIONOCCURED = 5
    USERNOTFOUND = 6

    @property
    def description(self) -> str:
        if self == self.NONEXISTENTPASTE:
            return "Requested paste just doesn\'t exist"
        elif self == self.NOTLOGGEDIN:
            return "User should be logged in to do that operation"
        elif self == self.PERMISSIONDENIED:
            return "Lack of permissions"


class ResultMixin:
    ok = graphene.Boolean(default_value=True, description="Mutation result")
    error = graphene.String(default_value=None, description="Error string")
    error_code = graphene.Field(ErrorCode, description="Numeric error code")
