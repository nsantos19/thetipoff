import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRouter} from 'next/router'
function BootList(props) {
  const router = useRouter();
  return (
    <ListGroup className='bg-dark' >
      {props.posts.map(post =>{
        return(
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-center align-items-center text-black list-group-item-secondary"

            
        action
        onClick={() => router.push('/' + post._id)}
      >
        <div className="fontms-3 me-auto">
          <div className="fw-bold">
           <h3 className='phoneSizeLarge'> {post.title}</h3>
          </div>
                <p className='phoneSizeSmall'>By: {post.author}</p>
        </div>
    <div className={"listBadge"}>
        <Badge bg="dark" pill>

              {(new Date(post.date)).toLocaleDateString("en-US")}
                
        </Badge>
                <p/>
        <Badge bg="dark" pill>
          {"Tags: "+ post.categories}
                
        </Badge>
                
      </div>
      </ListGroup.Item>
        )
      })}
    </ListGroup>
  );
}

export default BootList;
