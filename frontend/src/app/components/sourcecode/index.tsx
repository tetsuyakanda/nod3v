import { Popper } from '@material-ui/core';
import { SourceCodeToken } from 'app/models/token';
import * as React from 'react';
import { interval, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { ValueList, ValueListItem } from '../organisms/valueList';
import { Line } from './line';

export type VarValueData = { [varId: string]: ValueListItem[] | undefined };

interface Props {
  tokens: SourceCodeToken[];
  data: VarValueData;
}

function groupTokensByLine(tokens: SourceCodeToken[]): SourceCodeToken[][] {
  const lineCount = tokens[tokens.length - 1].startLine!;
  const result: SourceCodeToken[][] = Array.from({ length: lineCount }, (v, k) => k).map(() => []);

  for (const token of tokens) {
    result[token.startLine! - 1].push(token);
  }

  return result;
}

interface State {
  data: ValueListItem[] | undefined;
  valueListVisible: boolean;
  popperAnchorEl: HTMLElement | undefined;
}

export class Sourcecode extends React.Component<Props, State> {
  private _subject: Subject<boolean>;

  constructor(props: Props, state: State) {
    super(props, state);

    this._subject = new Subject();

    this.state = {
      data: undefined,
      valueListVisible: false,
      popperAnchorEl: undefined
    };

    this._subject.subscribe((value) => {
      console.log(value);
    });

    this._subject.pipe(debounce(() => interval(200))).subscribe((value) => {
      if (value === false) {
        this.setState({
          valueListVisible: false,
          popperAnchorEl: undefined
        });
      }
    });
  }

  onTokenEnter(tokenId: string, target: HTMLElement) {
    const valueListData = this.props.data[tokenId];
    if (valueListData) {
      this._subject.next(true);

      this.setState({
        data: valueListData,
        valueListVisible: true,
        popperAnchorEl: target
      });
    }
  }

  onTokenLeave(tokenId: string, target: HTMLElement) {
    this._subject.next(false);
  }

  onValueListEnter() {
    this._subject.next(true);
  }

  onValueListLeave() {
    this._subject.next(false);
  }

  render() {
    const { tokens, data } = this.props;

    return (
      <div>
        <pre>
          <code>
            {groupTokensByLine(tokens).map((lineTokens, index) => (
              <Line
                key={index}
                tokens={lineTokens}
                line={1}
                data={data}
                onTokenEnter={this.onTokenEnter.bind(this)}
                onTokenLeave={this.onTokenLeave.bind(this)}
              />
            ))}
          </code>
        </pre>
        <Popper
          className="popper-wrapper open"
          open={this.state.valueListVisible}
          anchorEl={this.state.popperAnchorEl}
          placement="bottom"
        >
          {this.state.data ? (
            <ValueList
              items={this.state.data}
              onEnter={this.onValueListEnter.bind(this)}
              onLeave={this.onValueListLeave.bind(this)}
            />
          ) : (
            <span> </span>
          )}
        </Popper>
      </div>
    );
  }
}
