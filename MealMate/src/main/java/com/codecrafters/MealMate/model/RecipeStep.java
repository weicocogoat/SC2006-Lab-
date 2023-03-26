package com.codecrafters.MealMate.model;

public class RecipeStep {
    private int stepNum;
    private String stepInstruction;

    public RecipeStep(int stepNum, String stepInstruction) {
        this.stepNum = stepNum;
        this.stepInstruction = stepInstruction;
    }

    public int getStepNum() {
        return stepNum;
    }

    public void setStepNum(int stepNum) {
        this.stepNum = stepNum;
    }

    public String getStepInstruction() {
        return stepInstruction;
    }

    public void setStepInstruction(String stepInstruction) {
        this.stepInstruction = stepInstruction;
    }
}
