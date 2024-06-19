from django.db import models

# Create your models here.
class Todo(models.Model):
    tittle = models.CharField(max_length=100)
    description =models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.tittle