# Accessibility Report

_{{currentDate}}_

## Scenario: "{{scenario}}"

Actor is **{{actor}}**


{{#msgs}}
### STEP: {{stepDescr}}
    {{#issues}}
###### {{type}}
{{#msg}}
 * {{m}}
{{/msg}}


{{/issues}}

---
{{/msgs}}