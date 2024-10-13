package com.example.aretech.ui.base.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.paging.PagingDataAdapter
import androidx.recyclerview.widget.DiffUtil
import androidx.viewbinding.ViewBinding

class RecyclerPagingAdapter<VB : ViewBinding, D : Any> @JvmOverloads constructor(
    private val onInflate: (LayoutInflater, ViewGroup?, Boolean) -> VB,
    private val onBind: (VB, D, Int) -> Unit,
    private val recyclingEnabled: Boolean = true,
    diffCallback: DiffUtil.ItemCallback<D> = GenericDiffCallback()
) : PagingDataAdapter<D, RecyclerViewHolder<VB, D>>(diffCallback) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerViewHolder<VB, D> {
        return RecyclerViewHolder.create(parent, onInflate, onBind).apply {
                setIsRecyclable(recyclingEnabled)
        }
    }

    override fun onBindViewHolder(holder: RecyclerViewHolder<VB, D>, position: Int) {
        getItem(position)?.let { holder.bind(it) }
    }



    override fun getItemViewType(position: Int): Int {
        return position
    }

    fun notifyBasketItemChanged() {
        notifyDataSetChanged()
    }

    fun refreshAdapter() {
        refresh()
    }

}