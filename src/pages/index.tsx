import { Component, ReactElement, JSXElementConstructor, ReactPortal } from 'react';
import { Liff } from '@line/liff';

interface LiffStates {
  idToken: string;
  lineContext: string;
  accessToken: string;
}

export default class Home extends Component<any, LiffStates> {
  private initedLiff?: Liff;

  constructor(props: any) {
    super(props);
    this.state = {
      idToken: '',
      lineContext: '',
      accessToken: '',
    };

    this.loadAccountInfo = this.loadAccountInfo.bind(this);
  }

  async loadAccountInfo() {
    const idToken = this.initedLiff?.getIDToken();
    if (idToken) {
      this.setState({ idToken: idToken });
    }
    const context = this.initedLiff?.getContext();
    if(context){
      this.setState({ lineContext: JSON.stringify(context) });
    }
    const accessToken = this.initedLiff?.getAccessToken()
    if(accessToken){
      this.setState({ accessToken: accessToken });
    }
  }

  componentDidMount() {
    import('@line/liff').then((liff: any) => {
      liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' }).then(() => {
        this.initedLiff = liff;
        this.loadAccountInfo();
      });
    });
  }

  componentWillUnmount = () => {};

  render(): ReactElement<any, string | JSXElementConstructor<any>> | string | number | ReactPortal | boolean | null | undefined {
    return (
      <>
          <div>idToken:{this.state.idToken}</div>
          <div>lineContext:{this.state.lineContext}</div>
          <div>accessToken:{this.state.accessToken}</div>
      </>
    );
  }
}
