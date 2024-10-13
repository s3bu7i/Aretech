package com.example.aretech.ui.base.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.viewbinding.ViewBinding

class RecyclerListAdapter<VB : ViewBinding, D : Any> @JvmOverloads constructor(
    private val onInflate: (LayoutInflater, ViewGroup?, Boolean) -> VB,
    private val onBind: (VB, D, Int) -> Unit,
    private val recyclingEnabled: Boolean = true,
    diffCallback: DiffUtil.ItemCallback<D> = GenericDiffCallback()
) : ListAdapter<D, RecyclerViewHolder<VB, D>>(diffCallback) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerViewHolder<VB, D> {
        return RecyclerViewHolder.create(parent, onInflate, onBind).apply {
            setIsRecyclable(recyclingEnabled)
        }
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getItemViewType(position: Int): Int {
        return position
    }
    override fun onBindViewHolder(holder: RecyclerViewHolder<VB, D>, position: Int) {
        holder.bind(getItem(position))
    }
}




