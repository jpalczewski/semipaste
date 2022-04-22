# 3rd-Party
import graphene


class ErrorCode(graphene.Enum):
    OK = 0
    NON_EXISTENT_PASTE = 1
    NOT_LOGGED_IN = 2
    PERMISSION_DENIED = 3
    OPERATION_FAILED = 4
    EXCEPTION_OCCURRED = 5
    USER_NOT_FOUND = 6
    POSSIBLE_FAILURE = 7

    @property
    def description(self) -> str:
        match self:
            case self.NON_EXISTENT_PASTE:
                return "Requested paste just doesn't exist"
            case self.NOT_LOGGED_IN:
                return "User should be logged in to do that operation"
            case self.PERMISSION_DENIED:
                return "Lack of permissions"
            case self.OPERATION_FAILED:
                return "Operation failed"
            case self.EXCEPTION_OCCURRED:
                return "Exception occurred"
            case self.USER_NOT_FOUND:
                return "User doesn't exist"
            case self.POSSIBLE_FAILURE:
                return "Something went wrong"


class ResultMixin:
    ok = graphene.Boolean(default_value=False, description="Mutation result")
    error = graphene.String(description="Error string")
    error_code = graphene.Field(
        ErrorCode,
        description="Numeric error code",
        default_value=ErrorCode.POSSIBLE_FAILURE,
    )
