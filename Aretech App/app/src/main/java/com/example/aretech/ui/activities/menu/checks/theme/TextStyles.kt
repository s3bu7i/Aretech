package com.example.aretech.ui.activities.menu.checks.theme

import androidx.annotation.StringRes
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.sp
import com.example.aretech.R


@Composable
fun TextBody2Regular_13sp_greyScale300(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start
) = Text(
    modifier = modifier,
    fontFamily = FontFamily(Font(R.font.sf_pro_display)),
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    textAlign = textAlign,
    color = colorResource(id = R.color.grey_scale_300),
    text = text
)


@Composable
fun TextBody2Regular_13sp_greyScale300(
    modifier: Modifier = Modifier,
    @StringRes text: Int,
    textAlign: TextAlign = TextAlign.Start) = TextBody2Regular_13sp_greyScale300(modifier = modifier, text = stringResource(id = text), textAlign = textAlign)



@Composable
fun TextBody2Regular_13sp_greyScale900(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start,
) = Text(
    modifier = modifier,
    fontFamily = FontFamily(Font(R.font.sf_pro_display)),
    fontWeight = FontWeight.Medium,
    textAlign = textAlign,
    fontSize = 13.sp,
    color = colorResource(id = R.color.grey_scale_900),
    text = text
)

@Composable
fun TextBody2Regular_13sp_greyScale900(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start) = TextBody2Regular_13sp_greyScale900(
    modifier = modifier,
    textAlign = textAlign,
    text = stringResource(id = text)
)


@Composable
fun TextBody2Bold_13sp_greyScale900(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start
) = Text(
    modifier = modifier,
    fontFamily = FontFamily(Font(R.font.sf_pro_display_bold)),
    fontWeight = FontWeight.Medium,
    textAlign = textAlign,
    fontSize = 13.sp,
    color = colorResource(id = R.color.grey_scale_900),
    text = text
)

@Composable
fun TextBody2Bold_13sp_greyScale900(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start) = TextBody2Bold_13sp_greyScale900(text = stringResource(id = text), modifier = modifier, textAlign = textAlign)


@Composable
fun TextBody2Bold_13sp_primary500(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start
) = Text(
    modifier = modifier,
    fontFamily = FontFamily(Font(R.font.sf_pro_display_bold)),
    fontWeight = FontWeight.Medium,
    textAlign = textAlign,
    fontSize = 13.sp,
    color = colorResource(id = R.color.primary_500),
    text = text
)

@Composable
fun TextBody2Bold_13sp_primary500(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start) = TextBody2Bold_13sp_primary500(text = stringResource(id = text), modifier = modifier, textAlign = textAlign)


@Composable
fun TextBody2Regular_13sp_warning500(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start
) = Text(
    modifier = modifier,
    textAlign = textAlign,
    fontFamily = FontFamily(Font(R.font.sf_pro_display)),
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    color = colorResource(id = R.color.warning_500),
    text = text
)

@Composable
fun TextBody2Regular_13sp_warning500(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start) = TextBody2Regular_13sp_warning500(
    modifier = modifier,
    textAlign = textAlign,
    text = stringResource(id = text)
)

@Composable
fun TextBody2Regular_13sp_greyScale200(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start
) = Text(
    modifier = modifier,
    textAlign = textAlign,
    fontFamily = FontFamily(Font(R.font.sf_pro_display)),
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    color = colorResource(id = R.color.grey_scale_200),
    text = text
)

@Composable
fun TextBody2Regular_13sp_greyScale200(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start) = TextBody2Regular_13sp_greyScale200(modifier, stringResource(id = text), textAlign = textAlign)


@Composable
fun TextBody2Regular_13sp_error500(
    modifier: Modifier = Modifier,
    textAlign: TextAlign = TextAlign.Start,
    text: String
) = Text(
    modifier = modifier,
    textAlign = textAlign,
    fontFamily = FontFamily(Font(R.font.sf_pro_display)),
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    color = colorResource(id = R.color.error_500),
    text = text
)

@Composable
fun TextBody2Regular_13sp_error500(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start) = TextBody2Regular_13sp_greyScale200(modifier, stringResource(id = text), textAlign = textAlign)


@Composable
fun TextTitleMedium_13sp_greyScale900(
    modifier: Modifier = Modifier,
    textAlign: TextAlign = TextAlign.Start,
    text: String
) = Text(
    modifier = modifier,
    textAlign = textAlign,
    fontFamily = FontFamily(Font(R.font.sf_pro_medium)),
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    color = colorResource(id = R.color.grey_scale_900),
    text = text
)

@Composable
fun TextTitleMedium_13sp_greyScale900(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start) = TextTitleMedium_13sp_greyScale900(
    modifier = modifier,
    textAlign = textAlign,
    text = stringResource(id = text)
)

@Composable
fun TextTitleMedium_13sp_primary500(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start
) = Text(
    modifier = modifier,
    textAlign = textAlign,
    fontFamily = FontFamily(Font(R.font.sf_pro_medium)),
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    color = colorResource(id = R.color.primary_500),
    text = text
)

@Composable
fun TextTitleMedium_13sp_primary500(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start) = TextTitleMedium_13sp_primary500(
    modifier = modifier,
    textAlign = textAlign,
    text = stringResource(id = text)
)

@Composable
fun TextTitleMedium_13sp_warning500(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start
) = Text(
    modifier = modifier,
    textAlign = textAlign,
    fontFamily = FontFamily(Font(R.font.sf_pro_medium)),
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    color = colorResource(id = R.color.warning_500),
    text = text
)

@Composable
fun TextTitleMedium_13sp_warning500(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start) = TextTitleMedium_13sp_warning500(
    modifier = modifier,
    textAlign = textAlign,
    text = stringResource(id = text)
)


@Composable
fun TextTitleMedium_22sp_greyScale900(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start
) = Text(
    modifier = modifier,
    fontFamily = FontFamily(Font(R.font.sf_pro_medium)),
    fontWeight = FontWeight.Medium,
    fontSize = 22.sp,
    textAlign = textAlign,
    color = colorResource(id = R.color.grey_scale_900),
    text = text
)

@Composable
fun TextTitleMedium_22sp_greyScale900(
    modifier: Modifier = Modifier,
    @StringRes text: Int,
    textAlign: TextAlign = TextAlign.Start) = TextTitleMedium_22sp_greyScale900(modifier = modifier, text = stringResource(id = text), textAlign = textAlign)




@Composable
fun TextBody2Regular_16sp_greyScale900(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start,
    overflow: TextOverflow = TextOverflow.Clip
) = Text(
    modifier = modifier,
    fontFamily = FontFamily(Font(R.font.sf_pro_display)),
    fontWeight = FontWeight.Medium,
    textAlign = textAlign,
    fontSize = 16.sp,
    overflow = overflow,
    color = colorResource(id = R.color.grey_scale_900),
    text = text
)

@Composable
fun TextBody2Regular_16sp_greyScale900(modifier: Modifier = Modifier, @StringRes text: Int, textAlign: TextAlign = TextAlign.Start, overflow: TextOverflow = TextOverflow.Clip) = TextBody2Regular_16sp_greyScale900(
    modifier = modifier,
    overflow = overflow,
    textAlign = textAlign,
    text = stringResource(id = text)
)
@Composable
fun TextBody2Regular_13sp_primary200(
    modifier: Modifier = Modifier,
    text: String,
    textAlign: TextAlign = TextAlign.Start
) = Text(
    modifier = modifier,
    fontFamily = FontFamily(Font(R.font.sf_pro_display)),
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    textAlign = textAlign,
    color = colorResource(id = R.color.primary_200),
    text = text
)