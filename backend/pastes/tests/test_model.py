# Standard Library
from datetime import timedelta

# 3rd-Party
from graphene_django.utils.testing import GraphQLTestCase

# Project
from pastes.models import PasteBin

class TestModel(GraphQLTestCase):
    def setUp(self)->None:
        self.pasteBin = PasteBin(
            title="Title test",
            text="Text test",
            visible=True,
            expire_after="MIN",
            likes=21,
            dislikes=37)

    def test_01(self)->None:
        self.assertEqual(self.pasteBin.text, "Text test")

    def test_02(self)->None:
        self.assertEqual(self.pasteBin.text,"Text test")

    def test_03(self)->None:
        self.assertEqual(self.pasteBin.visible,True)

    def test_04(self)->None:
        self.assertEqual(self.pasteBin.expire_after,"MIN")

    def test_05(self)->None:
        self.assertEqual(self.pasteBin.likes,21)

    def test_06(self)->None:
        self.assertEqual(self.pasteBin.dislikes,37)

    def test_07(self)->None:
        self.assertEqual(self.pasteBin.get_time_choice("MIN"),timedelta(seconds=60))

    def test_08(self)->None:
        self.assertEqual(self.pasteBin.get_time_choice("HOUR"),timedelta(seconds=3600))

    def test_09(self)->None:
        self.assertEqual(self.pasteBin.get_time_choice("DAY"),timedelta(days=1))

    def test_10(self)->None:
        self.assertEqual(self.pasteBin.get_time_choice("WEEK"),timedelta(days=7))

    def test_11(self)->None:
        self.assertEqual(self.pasteBin.get_time_choice("MONTH"),timedelta(days=30))

    def test_12(self)->None:
        self.assertEqual(self.pasteBin.get_time_choice("YEAR"),timedelta(days=360))

    def test_13(self)->None:
        self.assertEqual(self.pasteBin.__str__(),"None. Title test")

    def test_14(self)->None:
        self.assertEqual(self.pasteBin._meta.ordering[0],"id")

    def test_15(self)->None:
        self.assertEqual(self.pasteBin._meta.verbose_name,"pastebin")

    def test_16(self)->None:
        self.assertEqual(self.pasteBin._meta.verbose_name_plural,"pastebins")