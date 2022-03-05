import React from 'react';
import dynamic from 'next/dynamic'
import {
  RequestTabs,
  Sidebar
} from '@grafnode/components';
import actions from 'providers/Store/actions';
import { useStore } from '../../providers/Store/index';
import StyledWrapper from './StyledWrapper';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/dialog/dialog';

import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/info';
import 'codemirror-graphql/jump';
import 'codemirror-graphql/mode';

import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/hint/show-hint.css';

import { IconStack, IconGitFork } from '@tabler/icons';

const RequestTabPanel = dynamic(import('@grafnode/components').then(mod => mod.RequestTabPanel), { ssr: false });

export default function Main() {
  const [state, dispatch] = useStore();

  const {
    collections,
    requestTabs,
    activeRequestTabId
  } = state;

  return (
    <div>
      <StyledWrapper>
        <Sidebar
          collections={collections}
          actions={actions}
          dispatch={dispatch}
          activeRequestTabId={activeRequestTabId}
        />
        <section className='flex flex-grow flex-col'>
          <div className="flex items-center" style={{"padding": "8px", "padding-bottom": "4px"}}>
            <IconStack size={18} strokeWidth={1.5}/>
            <span className="ml-2 mr-4 font-semibold">spacex</span>
            <IconGitFork size={16} strokeWidth={1}/>
            <span className="ml-1 text-xs">main</span>
          </div>
          <RequestTabs
            requestTabs={requestTabs}
            actions={actions}
            dispatch={dispatch}
            activeRequestTabId={activeRequestTabId}
          />
          <RequestTabPanel
            actions={actions}
            dispatch={dispatch}
            collections={collections}
            requestTabs={requestTabs}
            activeRequestTabId={activeRequestTabId}
          />
        </section>
      </StyledWrapper>
    </div>
  );
};

