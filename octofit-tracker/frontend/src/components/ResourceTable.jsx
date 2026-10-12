import PropTypes from 'prop-types'

export default function ResourceTable({ columns, items, emptyMessage }) {
  if (items.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            {columns.map((column) => <th key={column.heading} scope="col">{column.heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id ?? item.id ?? index}>
              {columns.map((column) => (
                <td key={column.heading}>{column.render(item, index)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

ResourceTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
    }),
  ).isRequired,
  emptyMessage: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}
