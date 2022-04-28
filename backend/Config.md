

## Black Config

*pyproject.toml*

```toml
[tool.black]
line-length = 88
target-version = ["py310"]
skip-string-normalization = true
extend-exclude = '''
(
    /(
          .git
        | .gitignore
        | .github
        | venv
        | mypy_cache
        | __py_cache__
        | migrations
        | backend/backend
    )/
)
'''

```



`line-length = 88`

```
How many characters per line to allow.
```



`target-version = ["py310"]`

```
Python versions that should be supported by Black's output.
```



`skip-string-normalization = true`

```python
# Don't normalize string quotes or prefixes.

# Hey Black, plz don't do this:
	""" """ => ""
	r"" / u"" => ""
	'' => ""

# Thanks
```


`extend-exclude = ...`

```
Like --exclude, but adds additional files and directories on top of the excluded ones.

Black is excluding by default everything from the .gitignore file.
```





## Flake8 Config

*setup.cfg*

```
[flake8]
max-line-length = 88
select = C, E, F, W, B, B950
extend-ignore = E203,E501
statistics = true
extend-exclude =
    .git,
    .gitignore,
    *.pot,
    __pycache__,
    venv,
    .env,
    migrations,
    manage.py
```





`max-line-length = 88`

```
How many characters per line to allow.
```



`select = C, E, F, W, B, B950`

```
Comma-separated list of errors and warnings to enable.
```



`extend-ignore = E203,E501`

```python
E203 = Whitespace before ':'
Example:
    with open('file.dat') as f : <--

E501 = Line too long (x > set_value)
```



`statistics = true`

```
Count errors and warnings.

Example:
7     F401 'django.contrib.admin' imported but unused
2     F403 'from .models import *' used; unable to detect undefined names
1     F405 'PasteBin' may be undefined, or defined from star imports: .models
```





## Isort Config

```toml
[tool.isort]
profile = "black"
atomic = true
combine_star = true
honor_noqa = true
lines_before_imports = 1
default_section = "THIRDPARTY"
import_heading_future = "Future"
import_heading_stdlib = "Standard Library"
import_heading_django = "Django"
import_heading_thirdparty = "3rd-Party"
import_heading_firstparty = "Project"
import_heading_localfolder = "Local"
known_django = "django"
sections = ["FUTURE","STDLIB","DJANGO","THIRDPARTY","FIRSTPARTY","LOCALFOLDER"]
```



`profile = "black"`

```python
- multi_line_output: 3
    "Mode 3 => Example":
    from third_party import (
        lib1,
        lib2,
        lib3,
        lib4,
    )

- include_trailing_comma: True
    "Includes a trailing comma on multi line imports that include parentheses."

- force_grid_wrap: 0
   "Force number of from imports. If 0 is passed in only line length is considered."

- use_parentheses: True
    "Use parentheses for line continuation on length limit instead of slashes."

- ensure_newline_before_comments: True
    "Inserts a blank line before a comment following an import."

- line_length: 88
```



`atomic = true`

```
Ensures the output doesn't save if the resulting file contains syntax errors.
```



`combine_star = true`

```
Ensures that if a star import is present, nothing else is imported from that namespace.
```



`honor_noqa = true`

```
Tells isort to honor noqa comments to enforce skipping those comments.
```



**Headings**

```
import_heading_future = "Future"
import_heading_stdlib = "Standard Library"
import_heading_django = "Django"
import_heading_thirdparty = "3rd-Party"
import_heading_firstparty = "Project"
import_heading_localfolder = "Local"
```



`known_django = "django"`

```
known_OTHER is how imports of custom sections are defined.
OTHER is a placeholder for the custom section name.
```



`sections = ["FUTURE","STDLIB","DJANGO","THIRDPARTY","FIRSTPARTY","LOCALFOLDER"]`

```
What sections isort should display imports for and in what order.
```



**Example**:

Library Order, First Party[Project] vs Local

```python
"""Dir file."""

# Future
import __future_

# Standard Library
import json

# Django
from django.db import models

# 3rd-Party
import graphene

# Project
from users.models import User

# Local
from .admin import PasteBinAdmin


class Example(models.Model):
    """Example model."""

    name = models.CharField()
    var = models.IntegerField()

    def foo(self) -> int
    	return var

    def __str__(self) -> str:
        return f'{self.name} - {self.var}'

    class Meta:  # noqa
        verbose_name = _("Example")
```





## MYPY Config

*pyproject.toml*

```toml
[tool.mypy]
python_version = "3.10"
ignore_missing_imports = true
disallow_any_generics = true
disallow_untyped_defs = true
no_implicit_optional = true
no_strict_optional = true
no_warn_no_return = true
warn_unreachable = true
allow_untyped_globals = true
allow_redefinition = true
show_error_context = true
show_error_codes = true
show_column_numbers = true
exclude = '''
(?x)
(
    migrations
    | backend/backend
    | backend/manage.py
)
'''

```



`ignore_missing_imports = true`

```
This flag makes mypy ignore all missing imports.
```



`disallow_any_generics = true`

```python
# Instead of:
    x: list

# Use this:
    from typing import List
    x: List[type]
```



`disallow_untyped_defs = true`

```python
# Instead of:
    def func(x):
        return x

# Use this:
    def func(x: int) -> int:
        return x
```



`no_implicit_optional = true`

```python
# Instead of:
    def foo(x: int = None) -> None:
        pass

# Use this:
    from typing import Optional
    def foo(x: Optional[int] = None) -> None:
        pass
```



`no_strict_optional = true`

```
Not checking the use of Optional and None
They are valid everywhere
```



`no_warn_no_return = true`

```python
A function can return a [None] or [Any] type.
A function can have an empty body
```



`warn_unreachable = true`

```
This flag will make mypy report an error whenever it encounters code determined
to be unreachable or redundant after performing type analysis.
```



`allow_untyped_globals = true`

```
This flag causes mypy to suppress errors caused by not being able to fully infer the types of
global and class variables.
```



`allow_redefinition = true`

```python
# By default, mypy won’t allow a variable to be redefined with an unrelated type.
# This flag enables redefinition of a variable with an arbitrary type in some contexts:
# only redefinitions within the same block and nesting depth as the original definition are allowed.

def process(items: List[str]) -> None:
    items = [item.split() for item in items]
```



`show_error_context = true`

```
This flag will precede all errors with “note” messages explaining the context of the error.
```



`show_error_codes = true`

```
This flag will add an error code [<code>] to error messages.
```



`show_column_numbers = true`

```
This flag will add column offsets to error messages.
```