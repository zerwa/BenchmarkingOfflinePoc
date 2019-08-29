import * as React from 'react';
import * as defs from '../definitions/definitions';
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {Action} from "../actions/actionTypes";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Row, Col, Button, Panel, Glyphicon} from "react-bootstrap";
import {push} from "connected-react-router";

interface urlParams {
    channelId: string;
}

interface params extends RouteComponentProps<urlParams> {}

interface connectedState {
    channel: defs.Channel | null;
}

interface connectedDispatch {
    //go to a local url
    push: (url: string) => void;
}

const mapStateToProps = (state: defs.State, ownProps: params): connectedState => {
    //select the specific channel from redux matching the channelId route parameter
    if(state.channels) {
        const channelId = parseInt(ownProps.match.params.channelId);
        const channel = state.channels.find(channel => channel.channelId === channelId);

        if(channel) {
            return {
                channel
            };
        }
    }

    return {
        channel: null
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): connectedDispatch => ({
    push: url => dispatch(push(url))
});

type fullParams = params & connectedState & connectedDispatch;

interface localState {}

class ViewChannelComponent extends React.Component<fullParams, localState> {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Panel>
                        <Panel.Heading>
                            Channel Id: {this.props.match.params.channelId}
                        </Panel.Heading>
                        <Panel.Body>
                            {
                                this.props.channel ?
                                    <div>Channel Name: {this.props.channel.displayName}</div> :
                                    <div>Loading...</div>
                            }
                            <Link to='/channels'>
                                Close using a link
                            </Link>
                        </Panel.Body>
                        <Panel.Footer>
                            <Button
                                onClick={e => {
                                    this.props.push('/channels');
                                }}
                            >
                                <Glyphicon glyph="remove"/> Close
                            </Button>
                        </Panel.Footer>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

export const ViewChannel: React.ComponentClass<params> =
    connect(mapStateToProps, mapDispatchToProps)(ViewChannelComponent);
