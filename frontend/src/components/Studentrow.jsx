import { useState } from 'react'

function StudentRow({ index, name, note, onSaveNote }) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(note || '')

  const handleSave = () => {
    onSaveNote(draft)
    setOpen(false)
  }

  return (
    <div className="student-row">
      <button
        type="button"
        className="student-row__header"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="student-row__name">
          {index}. {name}
          {note ? <span className="student-row__note-preview"> ({note})</span> : null}
        </span>
        <span className={`student-row__chevron ${open ? 'is-open' : ''}`}>&#8250;</span>
      </button>

      {open && (
        <div className="student-row__editor">
          <textarea
            className="student-row__textarea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a remark for this student..."
            rows={3}
            autoFocus
          />
          <div className="student-row__actions">
            <button type="button" className="student-row__cancel" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="student-row__save" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentRow