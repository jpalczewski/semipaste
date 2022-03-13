# Styling

---

Order in class

```python
class Example(models.Model):
	"""Example model"""

    # Variables
    variable = models.IntegerField()

    # Normal Methods
    def foo(self, x: int) -> int:
        return x

    # Override Methods
    def __save__(self) -> str:
        return self.name

    # Meta Class
    class Meta:
        ordering = ['id']
```



Function comments

```python
def foo(self, x: int) -> int:
    """
    Description.
    :returns: an integer value
    """
    return x
```
