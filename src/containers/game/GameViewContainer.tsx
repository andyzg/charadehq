import { connect } from 'react-redux'
import GameView from '../../components/game/GameView'

const mapStateToProps = (state, ownProps) => ({
  game: state.musictionary,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameView)


