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
    caseId: string;
}

interface params extends RouteComponentProps<urlParams> {}

interface connectedState {
    _case: defs.Case | null;
}

interface connectedDispatch {
    //go to a local url
    push: (url: string) => void;
}

const mapStateToProps = (state: defs.State, ownProps: params): connectedState => {
    //select the specific channel from redux matching the channelId route parameter
    if(state.cases) {
        const channelId = parseInt(ownProps.match.params.caseId);
        const _case = state.cases.find(c => c.caseId === channelId);

        if (_case) {
            return {
                _case
            };
        }
    }

    return {
        _case: null
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
                            Channel Id: {this.props.match.params.caseId}
                        </Panel.Heading>
                        <Panel.Body>
                            {
                                this.props._case ?
                                    <div>Case Name: {this.props._case.caseName}</div> :
                                    <div>Loading...</div>
                            }
                            <Link to='/channels'>
                                Close using a link
                            </Link>
                        </Panel.Body>
                        <Panel.Footer>
                            <Button
                                onClick={e => {
                                    this.props.push('/cases');
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
