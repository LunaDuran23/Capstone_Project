import React from 'react';
import Card from 'react-bootstrap/Card';
import { Grid } from "@material-ui/core/";

const Proposal = ({data}) =>{
    return(<>
        <Grid item xs={4} > 
                    <Card className='card_h'>
                        <Card.Body>
                            <Card.Title className='title_style'>
                                    {data}
                            </Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
            </Grid>
            </>
    );
}

export default Proposal;