package com.example.aretech.domain.settings.usecase

import com.example.aretech.data.retrofit.repository.RepositoryLogin
import javax.inject.Inject

class RequestPasswordChangeUseCase @Inject constructor(private val repositoryLogin: RepositoryLogin) {

    operator fun invoke(oldPassword:String, newPassword:String) = repositoryLogin.requestChangePassword(oldPassword, newPassword)
}