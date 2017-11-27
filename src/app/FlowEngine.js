import React from 'react';
import SampleData from './../data/sample.json';
import RulesData from './../data/rules.json';


export default class FlowEngine extends React.Component {
 
  constructor(props) {
    super(props);
    this.sample;
    this.rules;
    this.state = {
      path: []
    };
  }

  run(ruleId = 0, path = []) {
    const rule = this.rules.find((r) => r.id == ruleId);
    const result = this.createRuleFunction(rule.body)(this.sample);
    const nextRule = result ? rule.success : rule.fail;
    path.push({rule: rule, result: result });
    if(!nextRule || path.find((node) => node.rule.id == nextRule)) {
      return path;
    }
    return this.run(nextRule, path);
  }

  createRuleFunction(functionBody) {
    return new Function('obj', '"use strict"; ' + functionBody);
  }

  componentDidMount() {
    this.sample = SampleData;
    this.rules = RulesData;
    this.setState({
      path: this.run()
    })
  } 
  
  render() {
    return (
      <div className="flow-engine-component">
        <h1 className="text-secondary">Flow Engine</h1>
        {
          this.state.path.map((node) => 
            <RuleCard
              key={node.rule.id}
              id={node.rule.id}
              result={node.result}
              success={node.rule.success}
              fail={node.rule.fail}
              body={node.rule.body.toString()}/>
          )
        }
      </div>
    );
  }
}

function RuleCard(props) {
  const classSufix = props.result ? 'success' : 'danger';
  return (
    <div className={"card mb-3 border-" + classSufix}>
      <div className={"card-header collapsed text-" + classSufix + " border-" + classSufix}
      data-toggle="collapse" data-target={"#rule" + props.id + "body"}>
        <h4 className="card-title">Rule: {props.id}</h4>
        <div className="badges">
          <span className="badge badge-pill badge-success">{props.success}</span>
          <span className="badge badge-pill badge-danger">{props.fail}</span>
        </div>
      </div>
      <div className="collapse" id={"rule" + props.id + "body"}>
        <div className="card-body">
          <pre>function body(obj) {'{\n'}&#9;{props.body} {'\n}'}</pre>
        </div>
      </div>
    </div>
  );
}