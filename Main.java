package com.girladrift;

import java.util.Map;

public class Main {
    public static void main(String[] args) {
        UserInput input = new UserInput();
        input.playerLevel = 50;
        input.petLevel = 40;

        input.weaponLevels = Map.of(
            "검", 10,
            "활", 8,
            "총", 6,
            "창", 7,
            "망치", 5
        );

        input.weaponSkinBuffs = Map.of(
            "검", 20.0,
            "활", 15.0,
            "총", 10.0,
            "창", 12.0,
            "망치", 8.0
        );

        input.calculationType = "attack";
        ICalculator calculator = CalculatorFactory.getCalculator(input.calculationType);

        CalculationResult result = calculator.calculate(input);
        System.out.println(result.message);
        System.out.println("공격력: " + result.finalAttackPower);
    }
}