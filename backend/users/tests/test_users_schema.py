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

    def test_03_showUser_id_1(self) -> None:
        id_query = """query{allUsers{edges{node{id}}}}"""
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok }} """
        example_user = UserFactory()
        variables = {"confirmPassword": example_user.password,
                     "email": example_user.email,
                     "password": example_user.password,
                     "username": "Test03"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(id_query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["id"], '21')

    def test_04_showUser_id_2(self) -> None:
        id_query = """query{allUsers(id: 24){edges{node{id}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok }} """
        example_user = UserFactory()
        variables = {"confirmPassword": example_user.password,
                     "email": example_user.email,
                     "password": example_user.password,
                     "username": "Test04"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(id_query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["id"], '24')

    def test_05_showUser_lastLogin(self) -> None:
        id_query = """query{allUsers(id: 26){edges{node{lastLogin}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok }} """
        example_user = UserFactory()
        variables = {"confirmPassword": example_user.password,
                     "email": example_user.email,
                     "password": example_user.password,
                     "username": "Test05"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(id_query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["lastLogin"], None)

    def test_06_showUser_isSuperuser(self) -> None:
        id_query = """query{allUsers(id: 28){edges{node{isSuperuser}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok }} """
        example_user = UserFactory()
        variables = {"confirmPassword": example_user.password,
                     "email": example_user.email,
                     "password": example_user.password,
                     "username": "Test06"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(id_query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["isSuperuser"], False)

    def test_07_showUser_username(self) -> None:
        id_query = """query{allUsers(id: 30){edges{node{username}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok }} """
        example_user = UserFactory()
        variables = {"confirmPassword": example_user.password,
                     "email": example_user.email,
                     "password": example_user.password,
                     "username": "Test07"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(id_query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["username"], "Test07")
