import * as React from 'react';
import * as defs from '../definitions/definitions';
import {Route, RouteComponentProps, Switch} from "react-router";
import {Dispatch} from "redux";
import {Action, ActionTypes} from "../actions/actionTypes";
import {connect} from "react-redux";
import {ViewChannel} from "./ViewChannel";
import {Link} from "react-router-dom";
import {Row, Col, Grid, Panel, ListGroup, ListGroupItem, Alert} from "react-bootstrap";

interface urlParams {
    channelId: string;
}

interface params extends RouteComponentProps<urlParams> {}

interface connectedState {
    channels: defs.Channel[] | null;
}

interface connectedDispatch {
    reloadChannels: () => Promise<void>;
}

const mapStateToProps = (state: defs.State): connectedState => ({
    channels: state.channels
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): connectedDispatch => ({
    reloadChannels: async () => {
        //TODO: load data from server

        dispatch({
            type: ActionTypes.LOAD_CHANNELS,
            channels: [{
                channelId: 1,
                displayName: "General",
                canAnyoneInvite: true,
                isActiveDirectMessage: false,
                isGeneral: true,
                isPublic: true,
                ownerId: null
            }, {
                channelId: 2,
                displayName: "Random",
                canAnyoneInvite: true,
                isActiveDirectMessage: false,
                isGeneral: false,
                isPublic: true,
                ownerId: 1
            }, {
                channelId: 3,
                displayName: "Secret",
                canAnyoneInvite: false,
                isActiveDirectMessage: false,
                isGeneral: false,
                isPublic: false,
                ownerId: 1
            }]
        });
    }
});

type fullParams = params & connectedState & connectedDispatch;

interface localState {}

class ChannelListComponent extends React.Component<fullParams, localState> {

    componentDidMount() {
        this.props.reloadChannels();
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <Panel.Heading>Available Channels</Panel.Heading>
                            {
                                this.props.channels ?
                                    <ListGroup>
                                        {
                                            this.props.channels.map(channel =>
                                                <ListGroupItem key={channel.channelId}>
                                                    <Row>
                                                    <Col xs={6}>
                                                        {channel.displayName}
                                                    </Col>
                                                    <Col xs={6}>
                                                        <Link to={`${this.props.match.url}/${channel.channelId}/view`}>
                                                            Open
                                                        </Link>
                                                    </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                        }
                                        </ListGroup> :
                                    <Panel.Body>Loading...</Panel.Body>
                            }
                        </Panel>
                    </Col>
                </Row>
                <Switch>
                    <Route path={`${this.props.match.url}/:channelId/view`} component={ViewChannel}/>
                    <Route
                        render={() =>
                            <Alert bsStyle="warning">Please select a Channel girll</Alert>
                        }
                    />
                </Switch>
                <Row>
                    <Col xs={12}>
                        <Link to='/'>
                            Return to home
                        </Link>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export const ChannelList: React.ComponentClass<params> =
    connect(mapStateToProps, mapDispatchToProps)(ChannelListComponent);
