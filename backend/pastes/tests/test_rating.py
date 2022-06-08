# Standard Library
import time

# Django
from django.contrib.auth.models import AnonymousUser

# 3rd-Party
import graphene
from graphene.test import Client
from graphene_django.utils.testing import GraphQLTestCase

# Project
from schema import Mutation, Query
from users.factories import UserFactory

# Local
from ..factories import PasteBinFactory


class TestSchema(GraphQLTestCase):
    def setUp(self) -> None:
        class User:
            user = UserFactory()

        class User2:
            user = AnonymousUser()

        self.pasteBin = PasteBinFactory()
        self.user = User
        self.anonymousUser = User2
        self.client = Client(graphene.Schema(query=Query, mutation=Mutation))

    def test_01(self)->None:
        mutation="""mutation(
                        $paste: ID                        
                        $liked: Boolean){
                    ratePasteBin(input:{
                            paste: $paste,                      			                            
                            liked: $liked                        
                        }){
                        ok
                        error
                        errorCode    
                        }
                    }"""
        variables={
            "paste": self.pasteBin.id,
            "liked": True
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.anonymousUser
        )

        self.assertEqual(mutation_result["data"]["ratePasteBin"]["ok"], False)
        self.assertEqual(mutation_result["data"]["ratePasteBin"]["error"], "User not authenticated")
        self.assertEqual(mutation_result["data"]["ratePasteBin"]["errorCode"], "POSSIBLE_FAILURE")

    def test_02(self)->None:
        mutation="""mutation(
                        $paste: ID                        
                        $liked: Boolean){
                    ratePasteBin(input:{
                            paste: $paste,                      			                            
                            liked: $liked                        
                        }){
                        ok
                        error
                        errorCode    
                        }
                    }"""
        variables={
            "paste": self.pasteBin.id,
            "liked": True
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["ratePasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["ratePasteBin"]["error"], "Rating created")
        self.assertEqual(mutation_result["data"]["ratePasteBin"]["errorCode"], "POSSIBLE_FAILURE")

    def test_03(self)->None:
        mutation="""mutation(
                        $paste: ID                        
                        $liked: Boolean){
                    ratePasteBin(input:{
                            paste: $paste,                      			                            
                            liked: $liked                        
                        }){
                        ok
                        error
                        errorCode    
                        }
                    }"""
        variables={
            "paste": self.pasteBin.id,
            "liked": True
        }

        self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["ratePasteBin"]["ok"], False)
        self.assertEqual(mutation_result["data"]["ratePasteBin"]["error"], "Rating already exists")
        self.assertEqual(mutation_result["data"]["ratePasteBin"]["errorCode"], "POSSIBLE_FAILURE")

    def test_04(self)->None:
        mutation="""mutation(
                        $paste: ID                        
                        $liked: Boolean){
                    ratePasteBin(input:{
                            paste: $paste,                      			                            
                            liked: $liked                        
                        }){
                        ok
                        error
                        errorCode    
                        }
                    }"""
        variables_1={
            "paste": self.pasteBin.id,
            "liked": True
        }
        variables_2 = {
            "paste": self.pasteBin.id,
            "liked": False
        }

        self.client.execute(
            mutation, variable_values=variables_1, context=self.user
        )
        mutation_result = self.client.execute(
            mutation, variable_values=variables_2, context=self.user
        )

        self.assertEqual(mutation_result["data"]["ratePasteBin"]["ok"], True)
        self.assertEqual(mutation_result["data"]["ratePasteBin"]["error"], "Rating changed")
        self.assertEqual(mutation_result["data"]["ratePasteBin"]["errorCode"], "POSSIBLE_FAILURE")

    def test_05(self)->None:
        mutation="""mutation(
                        $paste: ID       
                        $user: ID                 
                        $liked: Boolean){
                    ratePasteBinId(input:{
                            paste: $paste,   
                            user: $user                   			                            
                            liked: $liked                        
                        }){
                        ok
                        error
                        errorCode    
                        }
                    }"""
        variables={
            "paste": self.pasteBin.id,
            "user": self.user.user.id,
            "liked": True
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["ratePasteBinId"]["ok"], True)
        self.assertEqual(mutation_result["data"]["ratePasteBinId"]["error"], "Rating created")
        self.assertEqual(mutation_result["data"]["ratePasteBinId"]["errorCode"], "POSSIBLE_FAILURE")

    def test_06(self)->None:
        mutation="""mutation(
                        $paste: ID    
                        $user: ID                    
                        $liked: Boolean){
                    ratePasteBinId(input:{
                            paste: $paste,  
                            user: $user,                    			                            
                            liked: $liked                        
                        }){
                        ok
                        error
                        errorCode    
                        }
                    }"""
        variables={
            "paste": self.pasteBin.id,
            "user": self.user.user.id,
            "liked": True
        }

        self.client.execute(
            mutation, variable_values=variables, context=self.user
        )
        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["ratePasteBinId"]["ok"], False)
        self.assertEqual(mutation_result["data"]["ratePasteBinId"]["error"], "Rating already exists")
        self.assertEqual(mutation_result["data"]["ratePasteBinId"]["errorCode"], "POSSIBLE_FAILURE")

    def test_07(self)->None:
        mutation = """mutation(
                            $paste: ID    
                            $user: ID                    
                            $liked: Boolean){
                        ratePasteBinId(input:{
                                paste: $paste,  
                                user: $user,                    			                            
                                liked: $liked                        
                            }){
                            ok
                            error
                            errorCode    
                            }
                        }"""
        variables_1 = {
            "paste": self.pasteBin.id,
            "user": self.user.user.id,
            "liked": True
        }
        variables_2 = {
            "paste": self.pasteBin.id,
            "user": self.user.user.id,
            "liked": False
        }

        self.client.execute(
            mutation, variable_values=variables_1, context=self.user
        )
        mutation_result = self.client.execute(
            mutation, variable_values=variables_2, context=self.user
        )

        self.assertEqual(mutation_result["data"]["ratePasteBinId"]["ok"], True)
        self.assertEqual(mutation_result["data"]["ratePasteBinId"]["error"], "Rating changed")
        self.assertEqual(mutation_result["data"]["ratePasteBinId"]["errorCode"], "POSSIBLE_FAILURE")

    def test_08(self)->None:
        mutation_1 = """mutation(
                        $paste: ID                                  
                        $liked: Boolean){
                    ratePasteBin(input:{
                            paste: $paste,                                               			                            
                            liked: $liked                        
                        }){
                        ok
                        error
                        errorCode    
                        }
                    }"""
        mutation_2 = """mutation(
                            $paste: ID){
                        isPasteBinRated(input:{
                                paste: $paste}){
                            ok
                            error
                            errorCode
                            isRated
                            rate
                            likes
                            dislikes
                            totalRating                                
                            }
                        }"""
        variables_1 = {
            "paste": self.pasteBin.id,
            "liked": True
        }
        variables_2 = {
            "paste": self.pasteBin.id
        }

        mutation_result_1= self.client.execute(
            mutation_1, variable_values=variables_1, context=self.user
        )
        mutation_result_2 = self.client.execute(
            mutation_2, variable_values=variables_2, context=self.user
        )

        self.assertEqual(mutation_result_1["data"]["ratePasteBin"]["ok"], True)
        self.assertEqual(mutation_result_1["data"]["ratePasteBin"]["error"], "Rating created")
        self.assertEqual(mutation_result_1["data"]["ratePasteBin"]["errorCode"], "POSSIBLE_FAILURE")

        self.assertEqual(mutation_result_2["data"]["isPasteBinRated"]["ok"], True)
        self.assertEqual(mutation_result_2["data"]["isPasteBinRated"]["error"], "Rate exists")
        self.assertEqual(mutation_result_2["data"]["isPasteBinRated"]["errorCode"], "POSSIBLE_FAILURE")
        self.assertEqual(mutation_result_2["data"]["isPasteBinRated"]["isRated"], True)
        self.assertEqual(mutation_result_2["data"]["isPasteBinRated"]["rate"], True)
        self.assertEqual(mutation_result_2["data"]["isPasteBinRated"]["likes"], 1)
        self.assertEqual(mutation_result_2["data"]["isPasteBinRated"]["dislikes"], 0)
        self.assertEqual(mutation_result_2["data"]["isPasteBinRated"]["totalRating"], 1)

    def test_09(self) -> None:
        mutation = """mutation(
                            $paste: ID){
                        isPasteBinRated(input:{
                                paste: $paste}){
                            ok
                            error
                            errorCode
                            isRated
                            rate
                            likes
                            dislikes
                            totalRating                                
                            }
                        }"""

        variables = {
            "paste": self.pasteBin.id
        }

        mutation_result = self.client.execute(
            mutation, variable_values=variables, context=self.user
        )

        self.assertEqual(mutation_result["data"]["isPasteBinRated"]["ok"], True)
        self.assertEqual(mutation_result["data"]["isPasteBinRated"]["error"], "Rate doesn't exist")
        self.assertEqual(mutation_result["data"]["isPasteBinRated"]["errorCode"], "POSSIBLE_FAILURE")
        self.assertEqual(mutation_result["data"]["isPasteBinRated"]["isRated"], False)
        self.assertEqual(mutation_result["data"]["isPasteBinRated"]["rate"], False)
        self.assertEqual(mutation_result["data"]["isPasteBinRated"]["likes"], 0)
        self.assertEqual(mutation_result["data"]["isPasteBinRated"]["dislikes"], 0)
        self.assertEqual(mutation_result["data"]["isPasteBinRated"]["totalRating"], 0)
