'use strict';
const socialFunctions = [
  {
    value: '校团委',
    label: '校团委',
    children: [
      {
        value: '副书记',
        label: '副书记',
        weight: 15,
      },
      {
        value: '部长',
        label: '部长',
        weight: 10,
      },
    ],
  },
  {
    value: '校学生会',
    label: '校学生会',
    children: [
      {
        value: '主席',
        label: '主席',
        weight: 15,
      },
      {
        value: '副主席',
        label: '副主席',
        weight: 13,
      },
      {
        value: '部长',
        label: '部长',
        weight: 10,
      },
      {
        value: '副部长',
        label: '副部长',
        weight: 8,
      },
    ],
  },
  {
    value: '校学生科协',
    label: '校学生科协',
    children: [
      {
        value: '主席',
        label: '主席',
        weight: 15,
      },
      {
        value: '副主席',
        label: '副主席',
        weight: 13,
      },
      {
        value: '部长',
        label: '部长',
        weight: 10,
      },
      {
        value: '副部长',
        label: '副部长',
        weight: 8,
      },
    ],
  },
  {
    value: '校青年志愿者协会',
    label: '校青年志愿者协会',
    children: [
      {
        value: '主席',
        label: '主席',
        weight: 15,
      },
      {
        value: '副主席',
        label: '副主席',
        weight: 13,
      },
      {
        value: '部长',
        label: '部长',
        weight: 10,
      },
      {
        value: '副部长',
        label: '副部长',
        weight: 8,
      },
    ],
  },
  {
    value: '院团委',
    label: '院团委',
    children: [
      {
        value: '副主席',
        label: '副主席',
        weight: 14,
      },
      {
        value: '部长',
        label: '部长',
        weight: 10,
      },
      {
        value: '副部长',
        label: '副部长',
        weight: 8,
      },
      {
        value: '部门干事',
        label: '部门干事',
        weight: 4,
      },
    ],
  },
  {
    value: '院学生会直属部门',
    label: '院学生会直属部门',
    children: [
      {
        value: '主席',
        label: '主席',
        weight: 14,
      },
      {
        value: '副主席',
        label: '副主席',
        weight: 12,
      },
      {
        value: '部长',
        label: '部长',
        weight: 10,
      },
      {
        value: '副部长',
        label: '副部长',
        weight: 8,
      },
      {
        value: '部门干事',
        label: '部门干事',
        weight: 4,
      },
    ],
  },
  {
    value: '院学生会年级工委会',
    label: '院学生会年级工委会',
    children: [
      {
        value: '主席',
        label: '主席',
        weight: 14,
      },
      {
        value: '年级工委会主任',
        label: '年级工委会主任',
        weight: 12,
      },
      {
        value: '办公室主任',
        label: '办公室主任',
        weight: 10,
      },
      {
        value: '办公室副主任',
        label: '办公室副主任',
        weight: 8,
      },
      {
        value: '年级大班长',
        label: '年级大班长',
        weight: 8,
      },
      {
        value: '团总支书记',
        label: '团总支书记',
        weight: 8,
      },
      {
        value: '班长',
        label: '班长',
        weight: 6,
      },
      {
        value: '团支书',
        label: '团支书',
        weight: 6,
      },
      {
        value: '办公室干事',
        label: '办公室干事',
        weight: 4,
      },
      {
        value: '班委',
        label: '班委',
        weight: 4,
      },
      {
        value: '团支委',
        label: '团支委',
        weight: 4,
      },
      {
        value: '寝室长',
        label: '寝室长',
        weight: 4,
      },
    ],
  },
  {
    value: '院学生科协',
    label: '院学生科协',
    children: [
      {
        value: '主席',
        label: '主席',
        weight: 14,
      },
      {
        value: '副主席',
        label: '副主席',
        weight: 12,
      },
      {
        value: '部长',
        label: '部长',
        weight: 10,
      },
      {
        value: '副部长',
        label: '副部长',
        weight: 8,
      },
      {
        value: '部门干事',
        label: '部门干事',
        weight: 4,
      },
    ],
  },
  {
    value: '院青年志愿者协会',
    label: '院青年志愿者协会',
    children: [
      {
        value: '主席',
        label: '主席',
        weight: 14,
      },
      {
        value: '副主席',
        label: '副主席',
        weight: 12,
      },
      {
        value: '部长',
        label: '部长',
        weight: 10,
      },
      {
        value: '副部长',
        label: '副部长',
        weight: 8,
      },
      {
        value: '部门干事',
        label: '部门干事',
        weight: 4,
      },
    ],
  },
  {
    value: '校级学生社团',
    label: '校级学生社团',
    children: [
      {
        value: '重要学生社团负责人正职',
        label: '重要学生社团负责人正职',
        weight: 11,
      },
      {
        value: '重要学生社团负责人副职',
        label: '重要学生社团负责人副职',
        weight: 8,
      },
      {
        value: '重要学生社团部长',
        label: '重要学生社团部长',
        weight: 6,
      },
      {
        value: '普通学生社团负责人正职',
        label: '普通学生社团负责人正职',
        weight: 6,
      },
      {
        value: '普通学生社团负责人副职',
        label: '普通学生社团负责人副职',
        weight: 4,
      },
    ],
  },
  {
    value: '院级学生社团',
    label: '院级学生社团',
    children: [
      {
        value: '五星学生社团负责人正职',
        label: '五星学生社团负责人正职',
        weight: 11,
      },
      {
        value: '五星学生社团负责人副职',
        label: '五星学生社团负责人副职',
        weight: 8,
      },
      {
        value: '四星学生社团负责人正职',
        label: '四星学生社团负责人正职',
        weight: 8,
      },
      {
        value: '四星学生社团负责人副职',
        label: '四星学生社团负责人副职',
        weight: 6,
      },
      {
        value: '三星学生社团负责人正职',
        label: '三星学生社团负责人正职',
        weight: 6,
      },
      {
        value: '三星学生社团负责人副职',
        label: '三星学生社团负责人副职',
        weight: 4,
      },
      {
        value: '二星学生社团负责人正职',
        label: '二星学生社团负责人正职',
        weight: 4,
      },
      {
        value: '二星学生社团负责人副职',
        label: '二星学生社团负责人副职',
        weight: 2,
      },
      {
        value: '一星学生社团负责人正职',
        label: '一星学生社团负责人正职',
        weight: 2,
      },
      {
        value: '一星学生社团负责人副职',
        label: '一星学生社团负责人副职',
        weight: 1,
      },
    ],
  },
  {
    value: '党支部',
    label: '党支部',
    children: [
      {
        value: '书记',
        label: '书记',
        weight: 8,
      },
      {
        value: '副书记',
        label: '副书记',
        weight: 6,
      },
      {
        value: '支委',
        label: '支委',
        weight: 4,
      },
    ],
  },
];

module.exports = socialFunctions;
