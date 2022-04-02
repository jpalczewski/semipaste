# Generated by Django 4.0.4 on 2022-04-23 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pastes', '0009_alter_attachment_options_remove_pastebin_exposure_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PasteTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_name', models.TextField(verbose_name='tag name')),
                ('paste_id_list', models.TextField(verbose_name='list of ids using the tag')),
            ],
        ),
    ]