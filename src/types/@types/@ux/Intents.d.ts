declare module '@ux/intents' {
  class Intents {
    ux: {
      action: ActionStyle;
      actionPrimary: ActionStyle;
      actionSecondary: ActionStyle;
      actionCritical: ActionStyle;
      actionControl: ActionStyle;
      actionFocused: ActionStyle;
      actionHovered: ActionStyle;
      actionChosen: ActionStyle;
      actionPrimaryFocused: ActionStyle;
      actionPrimaryHovered: ActionStyle;
      actionPrimaryChosen: ActionStyle;
      actionSecondaryFocused: ActionStyle;
      actionSecondaryHovered: ActionStyle;
      actionSecondaryChosen: ActionStyle;
      actionCriticalFocused: ActionStyle;
      actionCriticalHovered: ActionStyle;
      actionCriticalChosen: ActionStyle;
      actionControlFocused: ActionStyle;
      actionControlHovered: ActionStyle;
      actionControlChosen: ActionStyle;
      box: BoxStyle;
      boxLowContrast: BoxStyle;
      boxHighContrast: BoxStyle;
      boxLowContrastOverlay: BoxStyle;
      boxHighContrastOverlay: BoxStyle;
      control: ControlStyle;
      controlCritical: ControlStyle;
      controlFocused: ControlStyle;
      controlHovered: ControlStyle;
      controlChosen: ControlStyle;
      controlCriticalFocused: ControlStyle;
      controlCriticalHovered: ControlStyle;
      controlCriticalChosen: ControlStyle;
      controlKnob: ControlStyle;
      controlKnobCritical: ControlStyle;
      controlKnobFocused: ControlStyle;
      controlKnobHovered: ControlStyle;
      controlKnobChosen: ControlStyle;
      controlKnobCriticalFocused: ControlStyle;
      controlKnobCriticalHovered: ControlStyle;
      controlKnobCriticalChosen: ControlStyle;
      controlVoid: ControlStyle;
      controlVoidCritical: ControlStyle;
      controlVoidFocused: ControlStyle;
      controlVoidHovered: ControlStyle;
      controlVoidChosen: ControlStyle;
      controlVoidCriticalFocused: ControlStyle;
      controlVoidCriticalHovered: ControlStyle;
      controlVoidCriticalChosen: ControlStyle;
      feedback: FeedbackStyle;
      feedbackCritical: FeedbackStyle;
      feedbackDisabled: FeedbackStyle;
      feedbackWarning: FeedbackStyle;
      feedbackSuccess: FeedbackStyle;
      feedbackInfo: FeedbackStyle;
      feedbackHighlight: FeedbackStyle;
      feedbackNeutral: FeedbackStyle;
      feedbackInternal: FeedbackStyle;
      feedbackPassive: FeedbackStyle;
      feedbackHighContrastCritical: FeedbackStyle;
      feedbackHighContrastDisabled: FeedbackStyle;
      feedbackHighContrastWarning: FeedbackStyle;
      feedbackHighContrastSuccess: FeedbackStyle;
      feedbackHighContrastInfo: FeedbackStyle;
      feedbackHighContrastHighlight: FeedbackStyle;
      feedbackHighContrastNeutral: FeedbackStyle;
      feedbackHighContrastInternal: FeedbackStyle;
      feedbackHighContrastPassive: FeedbackStyle;
      figure: {
        figureColor0: string;
        figureColor1: string;
        figureColor2: string;
        figureColor3: string;
        figureColor4: string;
        figureColor5: string;
        figureColor6: string;
        figureColor7: string;
        figureColor8: string;
        figureColor9: string;
        figureColor10: string;
        figureColor11: string;
        figureColor12: string;
        figureColor13: string;
        figureColor14: string;
        figureColor15: string;
        figureColor16: string;
        figureColor17: string;
        figureColor18: string;
        figureColor19: string;
        figureColor20: string;
        figureColor21: string;
        figureColor22: string;
        figureColor23: string;
        figureColor24: string;
        figureColor25: string;
        figureColor26: string;
        figureColor27: string;
        figureColor28: string;
        figureColor29: string;
      };
      text: TextStyle;
      textCaption: TextStyle;
      textParagraph: TextStyle;
      textLabel: TextStyle;
      textTitle: TextStyle;
      textHeading: TextStyle;
      textAction: TextStyle;
      textInput: TextStyle;
      inactiveColor: string;
      activeColor: string;
      success: string;
    };
  }

  type ActionStyle = {
    backgroundColor: string;
    foregroundColor: string;
    borderColor: string;
    outlineColor: string;
    borderRadius: string;
  };

  type BoxStyle = {
    backgroundColor: string;
    foregroundColor: string;
    borderColor: string;
    outlineColor: string;
    borderRadius: string;
  };

  type ControlStyle = {
    backgroundColor: string;
    foregroundColor: string;
    borderColor: string;
    outlineColor: string;
    borderRadius: string;
  };

  type FeedbackStyle = {
    feedbackColor: string;
    onFeedbackColor: string;
  };

  type TextStyle = {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  };

  export = Intents;
}
