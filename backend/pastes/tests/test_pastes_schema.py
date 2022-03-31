# Django
from django.test import TestCase
from django.contrib.auth import get_user_model

# 3rd-Party
import graphene
from graphene.test import Client

# Project
from schema import Mutation, Query


class TestSchema(TestCase):

    def setUp(self) -> None:

        class Object:
            user = get_user_model().objects.create()

        self.user = Object

        self.query = """
            query{
              allPasteBin {
                edges {
                  node {
                    id
                    title
                    text
                    exposure
                    expireAfter
                    author{
                        id
                        }
                  }
                }
              }
            }
        """
        self.mutation = """
        mutation{
          addPasteBin(
            title: "Title test",
            text: "Paste text test",
            exposure: true,
            expireAfter: "DAY"
          ) {
            ok
            }
          }
        """
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))
