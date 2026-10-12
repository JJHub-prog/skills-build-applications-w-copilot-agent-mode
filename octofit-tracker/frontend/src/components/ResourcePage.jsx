import PropTypes from 'prop-types'
import ResourceTable from './ResourceTable.jsx'
import useCollection from './useCollection.js'

export default function ResourcePage({ title, description, endpoint, columns }) {
  const { items, isLoading, error } = useCollection(endpoint)

  return (
    <section aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <span className="record-count">{items.length} {items.length === 1 ? 'record' : 'records'}</span>
      </div>

      {isLoading && <p className="status-message" role="status">Loading {title.toLowerCase()}…</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!isLoading && !error && (
        <div className="data-card">
          <ResourceTable
            columns={columns}
            emptyMessage={`No ${title.toLowerCase()} found yet.`}
            items={items}
          />
        </div>
      )}
    </section>
  )
}

ResourcePage.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
    }),
  ).isRequired,
  description: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
