package com.example.aretech.ui.activities.menu.check_result.fragment

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.Scaffold
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import com.example.aretech.R
import com.example.aretech.ui.activities.menu.check_result.model.CheckResultResponseModel
import com.example.aretech.ui.activities.menu.check_result.state.CheckResultFragmentState
import com.example.aretech.ui.compose.dialogs.ToolbarAretech

@Composable
fun CheckResultFragmentScreen(
    state: CheckResultFragmentState,
    check: CheckResultResponseModel? = null,
    onBackPress: () -> Unit,
) {

    val scaffoldState = rememberScaffoldState()
    Scaffold(scaffoldState = scaffoldState,
        topBar = {
            ToolbarAretech(
                title = stringResource(id = R.string.check_result),
                isRightButtonHas = listOf(R.drawable.ic_refresh),
                isShowClientBar = false,
                backPress = onBackPress,
                rightButtonClick = {
//                    onEvent(FragmentEvent.RefreshLocation)
                }
            )
        }
    ) { paddingValues -> paddingValues

        Column(modifier = Modifier
            .fillMaxSize()
            .padding(paddingValues)) {

            LazyColumn {

            }
        }
    }
}


@Preview
@Composable
private fun CheckResultFragmentScreenPreview() {
    CheckResultFragmentScreen(state = CheckResultFragmentState(), onBackPress = {},
        check = null
    )
}