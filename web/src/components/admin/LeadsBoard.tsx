'use client'

import { SetStepNav, toast } from '@payloadcms/ui'
import Link from 'next/link'
import { useState, type DragEvent } from 'react'
import { LEAD_STATUSES, type LeadStatus } from '../../lib/lead-status'
import styles from './LeadsBoard.module.css'

export type BoardCard = {
  id: number
  name: string
  status: LeadStatus
  service: string | null
  assignee: string | null
  language: string | null
  createdAt: string
}

export type BoardColumn = { status: LeadStatus; label: string; cards: BoardCard[]; total: number }

type Props = { columns: BoardColumn[]; adminRoute: string; apiRoute: string }

const DATE = new Intl.DateTimeFormat('de-DE', { dateStyle: 'short', timeStyle: 'short' })

/** Columns per status; a card moves by drag and drop or with its status select (keyboard and touch). */
export default function LeadsBoard({ columns: initial, adminRoute, apiRoute }: Props) {
  const [columns, setColumns] = useState(initial)
  const [dragOver, setDragOver] = useState<LeadStatus | null>(null)

  const move = (id: number, to: LeadStatus) => {
    const from = columns.find((c) => c.cards.some((card) => card.id === id))
    const card = from?.cards.find((c) => c.id === id)
    if (!from || !card || from.status === to) return

    const previous = columns
    setColumns((cols) =>
      cols.map((c) => {
        if (c.status === from.status) return { ...c, cards: c.cards.filter((x) => x.id !== id), total: c.total - 1 }
        if (c.status === to) return { ...c, cards: [{ ...card, status: to }, ...c.cards], total: c.total + 1 }
        return c
      })
    )

    fetch(`${apiRoute}/leads/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: to }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status))
      })
      .catch(() => {
        setColumns(previous)
        toast.error('Status could not be saved.')
      })
  }

  const onDrop = (e: DragEvent<HTMLElement>, to: LeadStatus) => {
    e.preventDefault()
    setDragOver(null)
    const id = Number(e.dataTransfer.getData('text/plain'))
    if (id) move(id, to)
  }

  return (
    <>
      <SetStepNav nav={[{ label: 'Leads', url: `${adminRoute}/collections/leads` }, { label: 'Board' }]} />
      <div className={styles.header}>
        <h1>Leads board</h1>
        <Link href={`${adminRoute}/collections/leads`}>List view</Link>
      </div>
      <div className={styles.board}>
        {columns.map((column) => (
          <section
            key={column.status}
            className={`${styles.column} ${dragOver === column.status ? styles.over : ''}`}
            aria-label={column.label}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(column.status)
            }}
            onDragLeave={() => setDragOver((s) => (s === column.status ? null : s))}
            onDrop={(e) => onDrop(e, column.status)}
          >
            <h2 className={styles.columnTitle}>
              {column.label} <span className={styles.count}>{column.total}</span>
            </h2>
            {column.cards.map((card) => (
              <article
                key={card.id}
                className={styles.card}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', String(card.id))}
              >
                <Link className={styles.name} href={`${adminRoute}/collections/leads/${card.id}`}>
                  {card.name}
                </Link>
                <div className={styles.meta}>
                  {[card.service, card.language?.toUpperCase(), DATE.format(new Date(card.createdAt))]
                    .filter(Boolean)
                    .join(' · ')}
                </div>
                <div className={styles.meta}>{card.assignee ?? 'Unassigned'}</div>
                <select
                  className={styles.select}
                  aria-label={`Status of ${card.name}`}
                  value={card.status}
                  onChange={(e) => move(card.id, e.target.value as LeadStatus)}
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </article>
            ))}
            {column.total > column.cards.length && (
              <Link
                className={styles.more}
                href={`${adminRoute}/collections/leads?where[status][equals]=${column.status}`}
              >
                All {column.total} in the list
              </Link>
            )}
          </section>
        ))}
      </div>
    </>
  )
}
