export default function LoadMoreCards({ onClick }) {
  return (
    <div className="loadMoreCards">
      <span onClick={onClick} className="loadMoreCards__button">
        Load More
      </span>
    </div>
  )
}
