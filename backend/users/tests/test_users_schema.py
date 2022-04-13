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

    # add_user
    def test_01_showAllUsers_beforeAddMutation(self) -> None:
        query = """query{allUsers{edges{node{id lastLogin isSuperuser username firstName lastName email isStaff 
        isActive}}}} """
        query_result = self.client.execute(query)
        self.assertEqual(query_result["data"]["allUsers"]["edges"], [])

    def test_02_addUser_mutation(self) -> None:
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response}} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test02"}

        mutation_result = self.client.execute(mutation, variable_values=variables)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")

    def test_03_showUser_id_1(self) -> None:
        query = """query{allUsers{edges{node{id}}}}"""
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response}} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test03"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][1]["node"]["id"], '25')

    def test_04_showUser_id_2(self) -> None:
        query = """query{allUsers(id: 26){edges{node{id}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response}} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test04"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["id"], '26')

    def test_05_showUser_lastLogin(self) -> None:
        query = """query{allUsers{edges{node{lastLogin}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response}} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test05"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["lastLogin"], None)

    def test_06_showUser_isSuperuser(self) -> None:
        query = """query{allUsers{edges{node{isSuperuser}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response}} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test06"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["isSuperuser"], user.is_superuser)
        self.assertEqual(query_result["data"]["allUsers"]["edges"][1]["node"]["isSuperuser"], False)

    def test_07_showUser_username(self) -> None:
        query = """query{allUsers{edges{node{username}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response}} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test07"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["username"], user.username)
        self.assertEqual(query_result["data"]["allUsers"]["edges"][1]["node"]["username"], "Test07")

    def test_08_showUser_firstName(self) -> None:
        query = """query{allUsers{edges{node{firstName}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response}} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test08"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["firstName"], user.first_name)
        self.assertEqual(query_result["data"]["allUsers"]["edges"][1]["node"]["firstName"], "")

    def test_09_showUser_lastName(self) -> None:
        query = """query{allUsers{edges{node{lastName}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test09"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][0]["node"]["lastName"], user.last_name)
        self.assertEqual(query_result["data"]["allUsers"]["edges"][1]["node"]["lastName"], "")

    def test_10_showUser_isActive(self) -> None:
        query = """query{allUsers{edges{node{isActive}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test10"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][1]["node"]["isActive"], True)

    def test_11_showUser_email(self) -> None:
        query = """query{allUsers{edges{node{email}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test11"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][1]["node"]["email"], user.email)

    def test_12_showUser_isStaff(self) -> None:
        query = """query{allUsers{edges{node{isStaff}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test12"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][1]["node"]["isStaff"], False)

    def test_13_showUser_isVerified(self) -> None:
        query = """query{allUsers{edges{node{isVerified}}}} """
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": "Test12"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        query_result = self.client.execute(query)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        self.assertEqual(query_result["data"]["allUsers"]["edges"][1]["node"]["isVerified"], False)

    def test_14_password_validation_1(self) -> None:
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": "aBc1",
                     "email": user.email,
                     "password": "aBc1",
                     "username": "Test13"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "length should be at least 6")

    def test_15_password_validation_2(self) -> None:
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": "aBcDeF",
                     "email": user.email,
                     "password": "aBcDeF",
                     "username": "Test14"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Password should have at least one numeral")

    def test_16_password_validation_3(self) -> None:
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": "ABCDEF",
                     "email": user.email,
                     "password": "ABCDEF",
                     "username": "Test15"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addUser"]["response"],
                         "Password should have at least one lowercase letter")

    def test_17_password_validation_4(self) -> None:
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": "4Bc0eF",
                     "email": user.email,
                     "password": user.password,
                     "username": "Test15"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Passwords do not match!")

    def test_18_username_validation(self) -> None:
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": user.email,
                     "password": user.password,
                     "username": user.username}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Username already exists!")

    def test_19_email_validation(self) -> None:
        mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
        addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response }} """
        user = UserFactory()
        variables = {"confirmPassword": user.password,
                     "email": "user.email",
                     "password": user.password,
                     "username": "Test19"}
        mutation_result = self.client.execute(mutation, variable_values=variables)
        self.assertEqual(mutation_result["data"]["addUser"]["ok"], False)
        self.assertEqual(mutation_result["data"]["addUser"]["response"], "Invalid email!")

    # delete_user
    def test_20_deleteUser_1(self) -> None:
        query = """query{allUsers{edges{node{id}}}}"""
        add_mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
                addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response}} """
        delete_mutation = """mutation($id: ID!){deleteUser(id: $id){ok error errorCode}} """
        user2 = UserFactory()
        add_variables = {"confirmPassword": user2.password,
                         "email": user2.email,
                         "password": user2.password,
                         "username": "Test20"}

        class User2:
            user = user2

        add_mutation_result = self.client.execute(add_mutation, variable_values=add_variables)
        self.assertEqual(add_mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(add_mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        query_result = self.client.execute(query)
        userID = query_result["data"]["allUsers"]["edges"][1]["node"]["id"]
        delete_variables = {"id": userID}
        delete_mutation_result = self.client.execute(delete_mutation, variable_values=delete_variables, context=User2)
        self.assertEqual(delete_mutation_result["data"]["deleteUser"]["ok"], True)
        self.assertEqual(delete_mutation_result["data"]["deleteUser"]["error"], None)
        self.assertEqual(delete_mutation_result["data"]["deleteUser"]["errorCode"], "OK")

    def test_21_deleteUser_2(self) -> None:
        query = """query{allUsers{edges{node{id}}}}"""
        add_mutation = """mutation($confirmPassword: String! $email: String! $password: String! $username: String!){
                addUser(confirmPassword: $confirmPassword, email: $email, password: $password, username: $username){ok response}} """
        delete_mutation = """mutation($id: ID!){deleteUser(id: $id){ok error errorCode}} """
        user2 = UserFactory()
        add_variables = {"confirmPassword": user2.password,
                         "email": user2.email,
                         "password": user2.password,
                         "username": "Test20"}

        class User2:
            user = user2

        add_mutation_result = self.client.execute(add_mutation, variable_values=add_variables)
        self.assertEqual(add_mutation_result["data"]["addUser"]["ok"], True)
        self.assertEqual(add_mutation_result["data"]["addUser"]["response"], "Account created. Check your mailbox")
        query_result = self.client.execute(query)
        userID = query_result["data"]["allUsers"]["edges"][1]["node"]["id"]
        delete_variables = {"id": userID}
        user3 = User2
        user3.user.is_superuser = False
        delete_mutation_result = self.client.execute(delete_mutation, variable_values=delete_variables, context=user3)
        self.assertEqual(delete_mutation_result["data"]["deleteUser"]["ok"], False)
        self.assertEqual(delete_mutation_result["data"]["deleteUser"]["error"],
                         "You don't have permission to this action")
        self.assertEqual(delete_mutation_result["data"]["deleteUser"]["errorCode"], "PERMISSIONDENIED")