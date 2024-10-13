package com.example.aretech.domain.login

import com.example.aretech.data.retrofit.repository.RepositoryLogin
import com.example.aretech.data.retrofit.retrofitmodels.ModelCheckApiKey
import com.example.aretech.data.retrofit.retrofitmodels.ModelStandardResponse
import com.example.aretech.domain.result.DataError
import com.example.aretech.domain.result.Results
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class CheckTokenIsDisabledUseCase @Inject constructor(
    private val repositoryLogin: RepositoryLogin
){
    operator fun invoke(modelCheckApiKey: ModelCheckApiKey):Flow<Results<ModelStandardResponse, DataError>>{
        return repositoryLogin.postCheckTokenRepository(modelCheckApiKey)
    }
}