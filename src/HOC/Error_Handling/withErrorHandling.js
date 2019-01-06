import React , {Component} from 'react';
import Error from '../../Utilis/Error/Error';
import Modal from '../../UI/Modal/Modal';

const withErrorHandling = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: ''
        };

        //add the needed response interceptor for axios.
        componentWillMount = () => {
            this.requestInterceptor = axios.interceptors.request.use((config) => {
                //reset error string.
                this.setState({
                    error: ''
                });

                return config;
            },null);

            this.responseInterceptor = axios.interceptors.response.use((response) => {
                return response;
            }, (error) => {
                this.setState({
                    error: error.toString()
                });

                //to prevent handling by the success function.
                return Promise.reject(error);
            });
        }

        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }


        dismissModal = () => {
            this.setState({
                error: ''
            })
        };

        render(){
            return(
                <React.Fragment>
                    <Modal show={this.state.error ? 1: 0} hide={this.dismissModal}>
                        <Error>
                            {this.state.error}
                        </Error>
                    </Modal>
                    
                    <WrappedComponent  {... this.props}/>
                </React.Fragment>
            );
        };
    }
}


export default withErrorHandling;