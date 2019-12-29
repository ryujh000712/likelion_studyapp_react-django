import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = { like: false }
  }

  componentDidMount() {
    this.getLikes()
  }

  getLikes() {

  }

  handlingLikes() {
     
  }

  render() {
    return (
      <Card className={'card'}>
        <CardContent>
          <Typography className={'card-title'} color="textSecondary" gutterBottom>
            {this.id}번째 대나무
          </Typography>
          <Typography variant="h5" component="h2">
            <PostView
            key={this.id}
            title={this.title}
            content={this.content}
            />
          </Typography>
          <FormControlLabel
              control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
              label={this.likes}
          />
      </CardContent>
      <CardActions>
        <Button value={this.id} onClick={(event) => this.handlingDelete(this.id)} color="secondary" size="small">삭제하기</Button>
      </CardActions>
    </Card>

    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      results: [],
    }
  }


  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    console.log(_results)
    // this.setState({results: _results.data})
    this.setState({results: _results.data.map((post) => <Post />)})
  }

  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})    
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  handlingSubmit = async (event) => {
    event.preventDefault() // event의 기본적인 기능을 하지않게 함
    let result = await api.createPost(
      {
        title: this.state.title,
        content: this.state.content,
      }
    );
    console.log("작성 완료!", result);
    this.setState({title: '', content: ''})
    this.getPosts()
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="lg">
          <div className="PostingSection">
            <Paper className="PostingPaper">
              <h2>대나무 숲 글 작성하기</h2>
              <form className="PostingForm" onSubmit={this.handlingSubmit}>
                <TextField
                  id="outlined-name"
                  label="글 제목"
                  name="title"
                  value={this.state.title}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                />

                {/* <br /> */}

                {/* <textarea 
                  name="content"
                  value={this.state.content}
                  onChange={this.handlingChange}
                /> */}

                <TextField
                  id="outlined-name"
                  label="본문"
                  name="content"
                  multiline
                  rowsMax="4"
                  value={this.state.content}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                />

                {/* <br /> */}
                
                <Button variant="outlined" color="primary" type="submit">제출하기</Button>
              </form>
            </Paper>
          </div>

              {this.results}
        </Container>
      </div>
    )
  }
}

export default App;
