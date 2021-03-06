# Generated by Django 4.0.3 on 2022-03-28 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PasteBin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='title')),
                ('text', models.TextField(verbose_name='paste text')),
                ('date_of_creation', models.DateTimeField(blank=True, verbose_name='date of creation')),
                ('exposure', models.BooleanField(verbose_name='exposure')),
                ('expire_after', models.CharField(choices=[('NEVER', 'never'), ('HOUR', '1 hour'), ('DAY', '1 day'), ('WEEK', '1 week'), ('MONTH', '1 month'), ('YEAR', '1 year')], default='NEVER', max_length=5, verbose_name='expire after')),
                ('date_of_expiry', models.DateTimeField(blank=True, null=True, verbose_name='date of expiry')),
            ],
            options={
                'verbose_name': 'pastebin',
                'verbose_name_plural': 'pastebins',
                'ordering': ['id'],
            },
        ),
    ]
