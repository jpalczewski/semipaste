# 3rd-Party
import graphene
import pygments
from graphene import relay
from pygments import lexers
from pygments.formatters import HtmlFormatter
from pygments.styles import get_style_by_name

# Project
from pastes.models import PasteBin


def convert_to_html(code: str, lang: str) -> str:
    if lang != "Plain Text":
        escape_chars = '___ESCAPE_CHARS___'
        between_double_quotes = code.split('"')[1::2]
        between_single_quotes = code.split("'")[1::2]
        for bdq in between_double_quotes:
            if '\\n' in bdq:
                code = code.replace(bdq, bdq.replace('\\', escape_chars))
        for bsq in between_single_quotes:
            if '\\n' in bsq:
                code = code.replace(bsq, bsq.replace('\\', escape_chars))
        code = code.replace('\\n', '\n')
        lex = lexers.get_lexer_by_name(lang)
        code = (
            pygments.highlight(code, lex, HtmlFormatter(
                lineseparator='<br>',
                style="sas",
            ))
            .strip()
            .replace(escape_chars, '&#92;')
            .replace("class=\"", "class=\'")
            .replace("\">", "\'>")
        )
    return code


class HighlightPreview(relay.ClientIDMutation):
    highlight = graphene.String()

    class Input:
        code = graphene.String(required=True)
        lang = graphene.String(required=True)

    @staticmethod
    def mutate_and_get_payload(root, info, **input):  # type: ignore
        code = input.get('code')
        lang = input.get('lang')
        code = convert_to_html(code, lang)
        return HighlightPreview(highlight=code)


class HighlightPasteBin(relay.ClientIDMutation):
    highlight = graphene.String()

    class Input:
        id = graphene.ID(required=True)

    @staticmethod
    def mutate_and_get_payload(root, info, **input):  # type: ignore
        pk = int(input.get('id'))
        paste = PasteBin.objects.get(id=pk)
        code = convert_to_html(paste.text, paste.language)
        return HighlightPasteBin(highlight=code)
