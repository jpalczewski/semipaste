from schema import Query, Mutation
from django.test import TestCase
import graphene
from graphene.test import Client


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
