import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
function TabsExample(props) {
  return (
    <Tab.Container id="list-group-tabs-example" fill='true'> 
      <Row>
        <Col sm={4} >
          <ListGroup>
            {props.posts.map(post =>{
            return (
            <ListGroup.Item action href={"#" + post._id}>
            <h2>{post.title}</h2>
            <p>By: {post.author}</p>
            </ListGroup.Item>

            )
            })}
            {/* <ListGroup.Item action href="#link1"> */}
            {/*   Link 1 */}
            {/* </ListGroup.Item> */}
            {/* <ListGroup.Item action href="#link2"> */}
            {/*   Link 2 */}
            {/* </ListGroup.Item> */}
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content mountOnEnter="true" >
            {props.posts.map(post =>{
            return(
            <Tab.Pane eventKey={"#"+ post._id}>
                  {/* <MarkdownRenderer markdown={post.body}/> */}
                  <ReactMarkdown children={post.body} remarkPlugins={[remarkGfm]}/>
            </Tab.Pane>
            )
            })}
            {/* <Tab.Pane eventKey="#link1"> */}
            {/*   <p>fart man</p> */}
            {/* </Tab.Pane> */}
            {/* <Tab.Pane eventKey="#link2"> */}
            {/*   <p>fart man</p> */}
            {/* </Tab.Pane> */}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default TabsExample;
