import React, { Component} from 'react';
import NavLink from './../pages/NavLink.js';
// import '../ide.css';
import Script from 'react-load-script';


class ide extends Component{
  state = {
    scriptLoaded: false
  }
  handleScriptCreate = () => {
    this.setState({ scriptLoaded: false })
  }
  render(){
return(
    <div>
      <Script
      url="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
      onCreate={this.handleScriptCreate.bind(this)}
    />
      <Script
      url="https://cdnjs.cloudflare.com/ajax/libs/golden-layout/1.5.9/goldenlayout.min.js"
      onCreate={this.handleScriptCreate.bind(this)}
    />
    <Script
      url="https://unpkg.com/monaco-editor/min/vs/loader.js"
      onCreate={this.handleScriptCreate.bind(this)}
    />
    
    <Script
      url="https://unpkg.com/monaco-editor@0.18.1/min/vs/editor/editor.main.js"
      onCreate={this.handleScriptCreate.bind(this)}
    />
    <Script
      url="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"
      onCreate={this.handleScriptCreate.bind(this)}
    />
    <Script
      url="http://58-studios.com/ide.js"
      onCreate={this.handleScriptCreate.bind(this)}
    />
    
    <Script
      url="https://ide.judge0.com/third_party/download.js"
      onCreate={this.handleScriptCreate.bind(this)}
    />
   

  <div id="site-navigation" className="ui small inverted menu">
    <div id="site-header" className="header item">
      <a href="/">
        <img id="site-icon" src="assets/images/others/judge0_icon.png" />
        <h2>Judge0 IDE</h2>
      </a>
    </div>
    <div className="left menu">
      <div className="ui dropdown item site-links on-hover">
        File <i className="dropdown icon" />
        <div className="menu">
          <a className="item" target="_blank" href="/"><i className="file code icon" /> New File</a>
          <div className="item" onclick="save()"><i className="save icon" /> Save (Ctrl + S)</div>
          <div className="item" onclick="downloadSource()"><i className="download icon" /> Download</div>
          {/* <div class="item"><i class="share icon"></i> Share</div> */}
          <div id="insert-template-btn" className="item"><i className="file code outline icon" /> Insert template
            for current language</div>
        </div>
      </div>
      <div className="link item" onclick="$('#site-settings').modal('show')"><i className="cog icon" /> Settings</div>
      <div className="item borderless">
        <select id="select-language" className="ui dropdown">
          <option value={45} mode="UNKNOWN">Assembly (NASM 2.14.02)</option> {/* Unknown mode. Help needed. */}
          <option value={46} mode="shell">Bash (5.0.0)</option>
          <option value={47} mode="UNKNOWN">Basic (FBC 1.07.1)</option> {/* Unknown mode. Help needed. */}
          <option value={1011} mode="UNKNOWN">Bosque (latest)</option>  {/* Unknown mode. Help needed. */}
          <option value={75} mode="c">C (Clang 7.0.1)</option>
          <option value={1013} mode="c">C (Clang 9.0.1)</option>
          <option value={1001} mode="c">C (Clang 10.0.1)</option>
          <option value={48} mode="c">C (GCC 7.4.0)</option>
          <option value={49} mode="c">C (GCC 8.3.0)</option>
          <option value={50} mode="c">C (GCC 9.2.0)</option>
          <option value={51} mode="csharp">C# (Mono 6.6.0.161)</option>
          <option value={1017} mode="csharp">C# (Mono 6.10.0.104)</option>
          <option value={1016} mode="csharp">C# (.NET Core SDK 3.1.302)</option>
          <option value={1018} mode="csharp">C# Test (.NET Core SDK 3.1.302, NUnit 3.12.0)</option>
          <option value={76} mode="cpp">C++ (Clang 7.0.1)</option>
          <option value={1014} mode="cpp">C++ (Clang 9.0.1)</option>
          <option value={1002} mode="cpp">C++ (Clang 10.0.1)</option>
          <option value={52} mode="cpp">C++ (GCC 7.4.0)</option>
          <option value={53} mode="cpp">C++ (GCC 8.3.0)</option>
          <option value={54} mode="cpp">C++ (GCC 9.2.0)</option>
          <option value={1015} mode="cpp">C++ Test (Clang 10.0.1, Google Test 1.8.1)</option>
          <option value={1012} mode="cpp">C++ Test (GCC 8.4.0, Google Test 1.8.1)</option>
          <option value={1003} mode="c">C3 (latest)</option> {/* Replacement mode. Help needed. */}
          <option value={86} mode="clojure">Clojure (1.10.1)</option>
          <option value={77} mode="UNKNOWN">COBOL (GnuCOBOL 2.2)</option> {/* Unknown mode. Help needed. */}
          <option value={55} mode="UNKNOWN">Common Lisp (SBCL 2.0.0)</option> {/* Unknown mode. Help needed. */}
          <option value={56} mode="UNKNOWN">D (DMD 2.089.1)</option> {/* Unknown mode. Help needed. */}
          <option value={57} mode="UNKNOWN">Elixir (1.9.4)</option> {/* Unknown mode. Help needed. */}
          <option value={58} mode="UNKNOWN">Erlang (OTP 22.2)</option> {/* Unknown mode. Help needed. */}
          <option value={44} mode="plaintext">Executable</option>
          <option value={87} mode="fsharp">F# (.NET Core SDK 3.1.202)</option>
          <option value={1019} mode="fsharp">F# (.NET Core SDK 3.1.302)</option>
          <option value={59} mode="UNKNOWN">Fortran (GFortran 9.2.0)</option> {/* Unknown mode. Help needed. */}
          <option value={60} mode="go">Go (1.13.5)</option>
          <option value={88} mode="UNKNOWN">Groovy (3.0.3)</option> {/* Unknown mode. Help needed. */}
          <option value={61} mode="UNKNOWN">Haskell (GHC 8.8.1)</option> {/* Unknown mode. Help needed. */}
          <option value={62} mode="java">Java (OpenJDK 13.0.1)</option>
          <option value={1004} mode="java">Java (OpenJDK 14.0.1)</option>
          <option value={1005} mode="java">Java Test (OpenJDK 14.0.1, JUnit Platform Console Standalone 1.6.2)</option>
          <option value={63} mode="javascript">JavaScript (Node.js 12.14.0)</option>
          <option value={78} mode="kotlin">Kotlin (1.3.70)</option>
          <option value={64} mode="lua">Lua (5.3.5)</option>
          <option value={1006} mode="c">MPI (OpenRTE 3.1.3) with C (GCC 8.3.0)</option>
          <option value={1007} mode="cpp">MPI (OpenRTE 3.1.3) with C++ (GCC 8.3.0)</option>
          <option value={1008} mode="python">MPI (OpenRTE 3.1.3) with Python (3.7.3)</option>
          <option value={1009} mode="python">Nim (stable)</option> {/* Replacement mode. Help needed. */}
          <option value={79} mode="objective-c">Objective-C (Clang 7.0.1)</option>
          <option value={65} mode="UNKNOWN">OCaml (4.09.0)</option> {/* Unknown mode. Help needed. */}
          <option value={66} mode="UNKNOWN">Octave (5.1.0)</option> {/* Unknown mode. Help needed. */}
          <option value={67} mode="pascal">Pascal (FPC 3.0.4)</option>
          <option value={85} mode="perl">Perl (5.28.1)</option>
          <option value={68} mode="php">PHP (7.4.1)</option>
          <option value={43} mode="plaintext">Plain Text</option>
          <option value={69} mode="UNKNOWN">Prolog (GNU Prolog 1.4.5)</option> {/* Unknown mode. Help needed. */}
          <option value={70} mode="python">Python (2.7.17)</option>
          <option value={71} mode="python">Python (3.8.1)</option>
          <option value={1010} mode="python">Python for ML (3.7.3)</option>
          <option value={80} mode="r">R (4.0.0)</option>
          <option value={72} mode="ruby">Ruby (2.7.0)</option>
          <option value={73} mode="rust">Rust (1.40.0)</option>
          <option value={81} mode="UNKNOWN">Scala (2.13.2)</option> {/* Unknown mode. Help needed. */}
          <option value={82} mode="sql">SQL (SQLite 3.27.2)</option>
          <option value={83} mode="swift">Swift (5.2.3)</option>
          <option value={74} mode="typescript">TypeScript (3.7.4)</option>
          <option value={84} mode="vb">Visual Basic.Net (vbnc 0.0.0.5943)</option> 
        </select>
      </div>
      <div className="item fitted borderless wide screen only">
        <div className="ui input">
          <input id="compiler-options" type="text" placeholder="Compiler options" />
        </div>
      </div>
      <div className="item borderless wide screen only">
        <div className="ui input">
          <input id="command-line-arguments" type="text" placeholder="Command line arguments" />
        </div>
      </div>
      <div className="item no-left-padding borderless">
        <button id="run-btn" className="ui primary labeled icon button"><i className="play icon" />Run (F9)</button>
      </div>
      <div id="navigation-message" className="item borderless">
        <span className="navigation-message-text" />
      </div>
    </div>
    <div className="right menu">
      <div id="updates" className="link item changelogfy-widget">
        <i className="fitted bell icon" />
      </div>
      <div className="ui dropdown item site-links">
        More
        <i className="dropdown icon" />
        <div className="menu">
          {/* <a id="about" class="link item" target="_blank" href="https://judge0.com/about"><i class="info circle icon"></i> About</a> */}
          <a id="about" className="link item" target="_blank" href="https://rapidapi.com/hermanzdosilovic/api/judge0"><i className="server icon" /> API</a>
          <div className="divider" />
          <a className="item" target="_blank" href="https://www.patreon.com/hermanzdosilovic"><i className="patreon icon" />
            Become a Patron</a>
          <a className="item" target="_blank" href="https://paypal.me/hermanzdosilovic"><i className="paypal icon" />
            Donate with PayPal</a>
          <div className="divider" />
          <a className="item" target="_blank" href="https://github.com/judge0/ide"><i className="github icon" />
            View source
            code on Github</a>
          <a className="item" target="_blank" href="https://github.com/judge0/ide/issues/new"><i className="exclamation circle icon" /> Report an issue</a>
          <div className="divider" />
          <a className="item" target="_blank" href="https://forms.gle/p3KpGYSjxAbvGUft9"><i className="envelope icon" />
            Subscribe
            to Judge0 newsletter</a>
          <a className="item" target="_blank" href="https://discord.gg/GRc3v6n"><i className="discord icon" /> Join a Discord server</a>
          <div className="divider" />
          <a className="item" target="_blank" href="mailto:hermanz.dosilovic@gmail.com"><i className="paper plane icon" />
            Contact the author</a>
          <a className="item" target="_blank" href="https://hermanz.dosilovic.com"><i className="user icon" /> About
            the
            author</a>
          <div className="divider" />
          <a className="item" target="_blank" href="https://www.reddit.com/submit?url=https%3A%2F%2Fide.judge0.com&title=Judge0%20IDE" style={{backgroundColor: '#ff4500 !important', color: 'white !important'}}><i className="reddit icon" /> Share
            on Reddit</a>
          <a className="item" target="_blank" href="https://twitter.com/intent/tweet?text=Judge0%20IDE&url=https%3A%2F%2Fide.judge0.com&via=hermanzvonimir" style={{backgroundColor: '#1da1f2 !important', color: 'white !important'}}><i className="twitter icon" />
            Share on Twitter</a>
          <a className="item" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fide.judge0.com" style={{backgroundColor: '#1877f2 !important', color: 'white !important'}}><i className="facebook icon" />
            Share on Facebook</a>
        </div>
      </div>
    </div>
  </div>
  <div id="site-content" />
  <div id="site-modal" className="ui modal">
    <div className="header">
      <i className="close icon" />
      <span id="title" />
    </div>
    <div className="scrolling content" />
    <div className="actions">
      <div className="ui small labeled icon cancel button">
        <i className="remove icon" />
        Close (ESC)
      </div>
    </div>
  </div>
  <div id="site-settings" className="ui modal">
    <i className="close icon" />
    <div className="header">
      <i className="cog icon" />
      Settings
    </div>
    <div className="content">
      <div className="ui form">
        <div className="inline fields">
          <label>Editor Mode</label>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name="editor-mode" defaultValue="normal" defaultChecked="checked" />
              <label>Normal</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name="editor-mode" defaultValue="vim" />
              <label>Vim</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name="editor-mode" defaultValue="emacs" />
              <label>Emacs</label>
            </div>
          </div>
        </div>
        <div className="inline field">
          <div className="ui checkbox">
            <input type="checkbox" name="redirect-output" />
            <label>Redirect stderr to stdout</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="site-footer">
    <span id="donate-line">
      <a className="item" target="_blank" href="https://www.patreon.com/hermanzdosilovic"><i className="patreon icon" style={{color: '#f06553'}} /> Become a Patron</a>
      ·
      <a className="item" target="_blank" href="https://paypal.me/hermanzdosilovic"><i className="paypal icon" style={{color: '#00457c'}} /> Donate with PayPal</a>
    </span>
    <div id="editor-status-line" />
    <span>© 2016-2020 <a href="https://judge0.com">Judge0</a> · Powered by <a href="https://rapidapi.com/hermanzdosilovic/api/judge0">the most advanced open-source online code execution system</a>
      <span id="status-line" />
    </span></div>
</div>

)}}

export default ide