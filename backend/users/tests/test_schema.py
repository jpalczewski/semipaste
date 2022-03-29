# Django
from django.test import TestCase

# 3rd-Party
import graphene
from graphene.test import Client

# Project
from schema import Mutation, Query


class TestSchema(TestCase):
    def setUp(self):
        self.allUsers = """
           query{
              allUsers{
                edges{
                  node{
                    id
                    lastLogin
                    isSuperuser
                    username
                    firstName
                    lastName
                    email
                    isStaff
                    isActive
                  }
                }
              }
            }
        """

        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_showAllUsers_query(self):
        result = self.client.execute(self.allUsers)
        self.assertDictEqual({"data": {"allUsers": {"edges": []}}}, result)
