/**
 * @file StepBar.jsx
 * @description Multi-step progress indicator used in registration and cancel flows.
 *
 * AI USAGE: Maps to a custom row of <View> elements in React Native.
 *
 * @param {number} totalSteps
 * @param {number} currentStep - 1-indexed; steps < current are "done"
 */
export default function StepBar({ totalSteps, currentStep }) {
  return (
    <div className="step-bar">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const cls = stepNum < currentStep  ? 'done'
                  : stepNum === currentStep ? 'active'
                  : '';
        return <div key={stepNum} className={`step-seg ${cls}`} />;
      })}
    </div>
  );
}
