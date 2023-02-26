import Head from 'next/head';
import { Component, ReactElement, JSXElementConstructor, ReactPortal } from 'react';
import { Liff } from '@line/liff';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import axios from 'axios';

interface LiffStates {
  idToken: string;
  lineContext: string;
  accessToken: string;
  events: EventObj[];
}

interface EventObj {
  id: string;
  title: string;
  description: string;
  comments: any[];
  likes: number;
  ownerId: string;
  participantFee: number;
  participants: any[];
  endsAt: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default class Home extends Component<any, LiffStates> {
  private initedLiff?: Liff;

  constructor(props: any) {
    super(props);
    this.state = {
      idToken: '',
      lineContext: '',
      accessToken: '',
      events: [],
    };

    this.loadAccountInfo = this.loadAccountInfo.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  async loadAccountInfo() {
    const idToken = this.initedLiff?.getIDToken();
    if (idToken) {
      this.setState({ idToken: idToken });
    }
    const context = this.initedLiff?.getContext();
    if (context) {
      this.setState({ lineContext: JSON.stringify(context) });
    }
    const accessToken = this.initedLiff?.getAccessToken();
    if (accessToken) {
      this.setState({ accessToken: accessToken });
    }
    await this.loadData();
  }

  componentDidMount() {
    import('@line/liff').then((liff: any) => {
      liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' }).then(() => {
        this.initedLiff = liff;
        this.loadAccountInfo();
      });
    });
  }

  async loadData() {
    const url = process.env.NEXT_PUBLIC_API_ROOT_URL || '';
    const eventsResponse = await axios.get(`${url}/events`);
    this.setState({ events: eventsResponse.data });
  }

  componentWillUnmount = () => {};

  render(): ReactElement<any, string | JSXElementConstructor<any>> | string | number | ReactPortal | boolean | null | undefined {
    return (
      <>
        <div>idToken:{this.state.idToken}</div>
        <div>lineContext:{this.state.lineContext}</div>
        <div>accessToken:{this.state.accessToken}</div>
        <div className='bg-white rounded-lg shadow lg:w-1/3'>
          <h2>イベント一覧</h2>
          <ul className='divide-y divide-gray-100'>
            {this.state.events.map((event, index) => {
              return (
                <li key={event.id} className='p-3 hover:bg-blue-600 hover:text-blue-200'>
                  <Link href={`/events/${event.id}`}>{event.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}
