# Django
from django.test import TestCase

# 3rd-Party
import graphene
from graphene.test import Client

# Project
from schema import Mutation, Query
from ..factories import UserFactory


class TestSchema(TestCase):

    def setUp(self) -> None:
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_01_showAllUsers_beforeAddMutation(self) -> None:
        query = """query{allUsers{edges{node{id lastLogin isSuperuser username firstName lastName email isStaff 
        isActive}}}} """
        query_result = self.client.execute(query)
        self.assertEqual(query_result["data"]["allUsers"]["edges"], [])

    def test_02_addUser_mutation(self) -> None:
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok }} """
        example_user = UserFactory()
        variables = {"confirmPassword": example_user.password,
                     "email": example_user.email,
                     "password": example_user.password,
                     "username": "Test02"}

        mutation_result = self.client.execute(mutation, variable_values=variables)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
