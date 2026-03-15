import { useEffect } from "react";

const TREE_FAVICON = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1288 1632">
  <path fill="black" fill-rule="evenodd" d="M 686 1498 L 684 1502 L 685 1508 L 691 1509 L 693 1506 Z M 655 1139 L 647 1139 L 643 1141 L 629 1155 L 614 1183 L 603 1216 L 594 1270 L 594 1307 L 599 1339 L 599 1360 L 596 1374 L 581 1401 L 533 1456 L 525 1477 L 521 1499 L 522 1522 L 534 1575 L 537 1577 L 540 1568 L 541 1501 L 546 1483 L 560 1459 L 570 1448 L 572 1448 L 587 1486 L 588 1503 L 584 1525 L 587 1526 L 591 1522 L 600 1505 L 603 1488 L 596 1455 L 596 1433 L 599 1422 L 605 1410 L 617 1393 L 645 1446 L 654 1478 L 654 1492 L 651 1511 L 637 1552 L 633 1573 L 634 1593 L 638 1605 L 642 1611 L 644 1610 L 645 1587 L 648 1573 L 654 1556 L 673 1515 L 682 1487 L 684 1487 L 693 1496 L 703 1509 L 712 1529 L 715 1546 L 715 1564 L 713 1573 L 714 1593 L 717 1591 L 726 1572 L 731 1552 L 730 1526 L 721 1500 L 704 1469 L 662 1404 L 650 1377 L 644 1358 L 638 1322 L 638 1292 L 644 1262 L 652 1240 L 672 1272 L 702 1303 L 716 1324 L 720 1336 L 720 1357 L 716 1385 L 716 1407 L 722 1432 L 735 1454 L 761 1483 L 775 1502 L 785 1523 L 791 1550 L 795 1559 L 798 1554 L 799 1544 L 798 1518 L 790 1493 L 777 1471 L 752 1439 L 743 1419 L 741 1409 L 741 1385 L 744 1369 L 748 1369 L 762 1390 L 779 1407 L 797 1437 L 799 1434 L 795 1409 L 773 1367 L 755 1318 L 741 1295 L 712 1258 L 698 1235 L 683 1203 L 666 1153 L 661 1144 Z M 564 21 L 534 21 L 499 27 L 472 37 L 428 61 L 362 71 L 342 77 L 316 89 L 291 107 L 277 121 L 263 139 L 236 182 L 221 191 L 186 206 L 148 234 L 128 256 L 117 273 L 110 288 L 99 322 L 93 373 L 90 383 L 83 393 L 59 419 L 36 455 L 27 479 L 20 518 L 20 545 L 24 571 L 32 595 L 42 615 L 36 649 L 36 673 L 42 699 L 57 732 L 67 746 L 92 773 L 114 790 L 138 803 L 171 814 L 196 818 L 232 818 L 273 811 L 338 787 L 374 777 L 406 775 L 436 779 L 460 787 L 481 797 L 511 818 L 532 840 L 547 863 L 555 880 L 563 906 L 568 941 L 568 968 L 562 1016 L 555 1047 L 549 1065 L 541 1081 L 532 1094 L 511 1114 L 493 1126 L 474 1135 L 427 1149 L 329 1161 L 304 1168 L 259 1185 L 207 1189 L 179 1195 L 156 1205 L 117 1231 L 88 1241 L 91 1244 L 97 1245 L 121 1244 L 136 1240 L 179 1218 L 206 1212 L 244 1213 L 246 1215 L 214 1260 L 200 1272 L 160 1294 L 133 1313 L 113 1321 L 99 1323 L 96 1325 L 99 1328 L 109 1330 L 133 1328 L 195 1301 L 199 1302 L 196 1327 L 188 1352 L 175 1374 L 150 1396 L 150 1399 L 154 1400 L 161 1398 L 177 1389 L 196 1371 L 206 1355 L 237 1281 L 257 1255 L 298 1217 L 323 1204 L 347 1198 L 396 1197 L 413 1199 L 375 1246 L 362 1259 L 343 1270 L 295 1289 L 279 1302 L 268 1317 L 260 1333 L 255 1349 L 238 1387 L 243 1387 L 257 1372 L 282 1334 L 300 1316 L 316 1308 L 358 1294 L 361 1295 L 360 1308 L 353 1336 L 349 1347 L 337 1368 L 314 1392 L 279 1418 L 262 1435 L 253 1447 L 245 1465 L 244 1485 L 245 1489 L 247 1490 L 265 1456 L 291 1434 L 301 1428 L 303 1430 L 303 1480 L 296 1503 L 287 1518 L 290 1520 L 305 1509 L 315 1493 L 320 1473 L 323 1441 L 327 1427 L 334 1414 L 358 1388 L 373 1366 L 384 1341 L 397 1287 L 411 1262 L 435 1236 L 454 1221 L 470 1211 L 521 1186 L 542 1173 L 543 1175 L 529 1206 L 515 1226 L 487 1259 L 471 1283 L 462 1301 L 454 1329 L 447 1343 L 434 1362 L 397 1403 L 385 1424 L 381 1436 L 378 1457 L 382 1522 L 376 1555 L 381 1552 L 388 1542 L 396 1522 L 398 1501 L 398 1462 L 400 1449 L 406 1432 L 413 1421 L 426 1407 L 455 1383 L 458 1385 L 468 1423 L 468 1454 L 463 1472 L 447 1505 L 442 1525 L 442 1543 L 445 1556 L 449 1564 L 456 1571 L 456 1535 L 459 1521 L 464 1509 L 484 1475 L 491 1452 L 491 1418 L 484 1374 L 484 1355 L 489 1329 L 499 1307 L 507 1296 L 514 1290 L 530 1342 L 531 1375 L 529 1390 L 531 1390 L 541 1372 L 547 1347 L 546 1324 L 541 1299 L 541 1279 L 543 1269 L 549 1252 L 584 1184 L 596 1151 L 606 1111 L 613 1046 L 612 949 L 605 882 L 592 835 L 572 790 L 556 765 L 539 744 L 514 720 L 486 700 L 459 687 L 436 679 L 391 670 L 349 669 L 317 674 L 301 679 L 273 692 L 247 707 L 226 714 L 196 714 L 175 705 L 161 693 L 156 685 L 157 684 L 184 693 L 201 693 L 224 687 L 285 651 L 284 639 L 264 620 L 242 607 L 222 605 L 178 609 L 160 606 L 146 600 L 136 593 L 120 574 L 114 559 L 113 544 L 115 543 L 129 562 L 139 572 L 153 580 L 165 582 L 185 582 L 206 580 L 223 575 L 223 571 L 216 562 L 209 547 L 202 521 L 198 494 L 187 470 L 170 453 L 138 436 L 140 433 L 147 432 L 170 433 L 179 436 L 199 447 L 213 461 L 222 478 L 226 490 L 237 541 L 244 559 L 270 587 L 291 605 L 314 620 L 345 632 L 364 635 L 422 639 L 456 646 L 484 657 L 489 656 L 486 642 L 469 591 L 456 568 L 444 555 L 428 546 L 419 544 L 400 545 L 364 554 L 342 553 L 328 548 L 311 534 L 300 518 L 298 511 L 299 509 L 319 525 L 338 532 L 354 532 L 385 524 L 385 521 L 356 500 L 342 486 L 332 467 L 322 429 L 312 414 L 300 407 L 276 400 L 237 383 L 222 371 L 213 360 L 209 352 L 205 333 L 205 318 L 207 303 L 211 292 L 213 291 L 218 316 L 223 331 L 234 348 L 245 359 L 257 365 L 286 372 L 321 385 L 326 378 L 329 366 L 330 352 L 327 339 L 317 327 L 292 317 L 291 314 L 298 310 L 308 309 L 328 312 L 341 322 L 349 338 L 351 355 L 351 428 L 355 444 L 366 466 L 374 475 L 391 486 L 428 500 L 451 512 L 464 522 L 480 539 L 489 552 L 499 573 L 523 648 L 540 682 L 567 715 L 594 742 L 616 770 L 619 770 L 620 745 L 616 698 L 615 646 L 610 603 L 599 563 L 575 511 L 555 480 L 534 458 L 523 450 L 499 437 L 469 427 L 454 420 L 432 403 L 416 377 L 400 305 L 388 271 L 377 250 L 360 230 L 349 224 L 338 221 L 322 222 L 317 224 L 314 223 L 323 213 L 342 206 L 364 207 L 380 214 L 394 226 L 404 240 L 414 261 L 418 275 L 421 278 L 446 250 L 454 235 L 459 217 L 459 192 L 457 182 L 451 168 L 439 155 L 429 149 L 406 143 L 404 140 L 412 136 L 431 135 L 448 139 L 464 149 L 473 159 L 482 179 L 486 199 L 486 220 L 482 237 L 475 252 L 450 288 L 440 311 L 438 322 L 438 342 L 443 365 L 451 380 L 463 390 L 482 400 L 513 409 L 515 407 L 515 402 L 510 383 L 509 371 L 511 343 L 516 326 L 521 316 L 534 301 L 535 307 L 530 331 L 529 356 L 531 379 L 540 413 L 558 440 L 591 472 L 600 485 L 608 503 L 610 503 L 613 495 L 616 465 L 619 398 L 617 239 L 615 225 L 609 212 L 592 192 L 571 148 L 564 138 L 545 122 L 530 116 L 515 113 L 514 111 L 526 106 L 549 105 L 570 113 L 586 129 L 598 151 L 610 181 L 615 186 L 618 175 L 620 134 L 630 58 L 618 42 L 604 33 L 581 24 Z M 723 21 L 709 24 L 694 30 L 675 46 L 662 70 L 655 93 L 649 131 L 645 191 L 648 315 L 651 341 L 655 353 L 659 352 L 702 287 L 725 262 L 742 251 L 764 243 L 789 239 L 800 232 L 804 222 L 807 196 L 813 175 L 818 166 L 832 152 L 847 145 L 867 144 L 885 148 L 896 158 L 867 157 L 858 159 L 846 165 L 838 173 L 831 189 L 828 233 L 824 247 L 820 254 L 809 263 L 764 276 L 749 285 L 736 298 L 717 324 L 675 395 L 660 441 L 655 469 L 651 508 L 651 582 L 655 626 L 661 657 L 665 657 L 673 652 L 711 611 L 727 588 L 741 556 L 745 536 L 745 514 L 735 456 L 735 431 L 742 410 L 753 394 L 767 379 L 775 374 L 780 375 L 762 403 L 757 426 L 759 456 L 765 475 L 771 485 L 831 442 L 844 429 L 856 412 L 864 381 L 865 314 L 869 287 L 880 264 L 900 244 L 912 236 L 924 231 L 949 229 L 956 232 L 954 235 L 931 244 L 919 253 L 905 271 L 900 282 L 894 307 L 894 372 L 891 396 L 885 414 L 886 419 L 898 419 L 923 412 L 937 406 L 945 400 L 952 390 L 960 373 L 968 343 L 977 323 L 987 309 L 1001 295 L 1013 287 L 1032 281 L 1050 283 L 1068 292 L 1083 309 L 1082 310 L 1073 305 L 1060 301 L 1044 301 L 1026 309 L 1014 320 L 1001 338 L 993 356 L 982 395 L 971 414 L 959 427 L 945 436 L 930 442 L 885 455 L 846 472 L 818 491 L 799 510 L 784 535 L 768 583 L 754 615 L 736 644 L 707 683 L 694 707 L 685 733 L 680 754 L 676 786 L 676 812 L 680 813 L 686 807 L 713 772 L 730 755 L 779 717 L 809 688 L 822 668 L 838 637 L 850 605 L 868 567 L 885 541 L 906 520 L 923 509 L 950 499 L 970 496 L 1007 496 L 1030 491 L 1045 483 L 1059 470 L 1067 458 L 1072 444 L 1077 396 L 1081 382 L 1085 375 L 1095 365 L 1100 364 L 1101 368 L 1093 386 L 1092 446 L 1086 470 L 1076 489 L 1062 503 L 1039 517 L 1038 520 L 1046 525 L 1060 529 L 1080 529 L 1097 522 L 1143 488 L 1161 483 L 1172 484 L 1180 489 L 1177 492 L 1158 497 L 1145 503 L 1099 543 L 1088 549 L 1074 553 L 1046 552 L 985 532 L 961 531 L 942 536 L 927 545 L 911 560 L 897 582 L 885 607 L 859 675 L 881 671 L 898 671 L 936 677 L 953 676 L 973 667 L 1037 620 L 1059 611 L 1071 610 L 1087 613 L 1104 620 L 1116 628 L 1129 640 L 1131 644 L 1130 647 L 1113 641 L 1093 637 L 1076 637 L 1052 642 L 1045 645 L 1030 656 L 996 691 L 984 701 L 989 706 L 1011 717 L 1041 728 L 1063 729 L 1084 723 L 1083 728 L 1073 739 L 1061 747 L 1050 751 L 1028 752 L 1005 746 L 956 722 L 939 717 L 924 715 L 878 716 L 858 720 L 839 727 L 817 738 L 798 751 L 780 766 L 749 799 L 734 820 L 716 854 L 702 894 L 694 930 L 691 964 L 696 1121 L 700 1150 L 720 1214 L 733 1238 L 759 1263 L 782 1280 L 814 1309 L 823 1322 L 825 1331 L 825 1359 L 817 1420 L 818 1444 L 826 1468 L 849 1502 L 856 1517 L 861 1538 L 862 1563 L 864 1564 L 867 1562 L 870 1555 L 873 1542 L 872 1516 L 868 1504 L 848 1467 L 843 1448 L 844 1415 L 851 1386 L 854 1385 L 863 1397 L 894 1428 L 913 1444 L 931 1467 L 941 1491 L 943 1531 L 947 1545 L 949 1545 L 952 1537 L 958 1508 L 959 1490 L 956 1472 L 952 1461 L 939 1438 L 924 1419 L 892 1385 L 882 1371 L 864 1338 L 854 1314 L 837 1284 L 766 1214 L 758 1182 L 760 1180 L 799 1197 L 833 1216 L 837 1216 L 875 1251 L 889 1270 L 901 1291 L 915 1330 L 926 1352 L 938 1369 L 978 1409 L 990 1430 L 1005 1468 L 1013 1479 L 1022 1487 L 1023 1483 L 1015 1464 L 1007 1424 L 1003 1413 L 1006 1412 L 1012 1414 L 1041 1432 L 1054 1445 L 1068 1469 L 1071 1471 L 1070 1453 L 1065 1438 L 1057 1425 L 1044 1412 L 1021 1396 L 993 1382 L 975 1367 L 961 1350 L 950 1332 L 937 1299 L 941 1298 L 959 1302 L 1000 1316 L 1017 1328 L 1033 1344 L 1047 1362 L 1053 1366 L 1051 1355 L 1039 1329 L 1024 1308 L 1012 1298 L 997 1290 L 953 1274 L 932 1262 L 897 1223 L 868 1195 L 937 1195 L 952 1197 L 978 1205 L 1005 1220 L 1031 1243 L 1049 1265 L 1066 1292 L 1078 1320 L 1095 1350 L 1117 1372 L 1125 1377 L 1146 1385 L 1156 1384 L 1128 1363 L 1111 1342 L 1099 1312 L 1096 1291 L 1100 1290 L 1109 1292 L 1177 1315 L 1193 1316 L 1196 1315 L 1197 1312 L 1191 1308 L 1170 1300 L 1136 1280 L 1091 1260 L 1080 1250 L 1051 1211 L 1066 1208 L 1099 1209 L 1127 1218 L 1155 1233 L 1169 1238 L 1186 1240 L 1201 1238 L 1203 1235 L 1175 1226 L 1137 1202 L 1108 1190 L 1079 1185 L 1033 1182 L 1019 1178 L 987 1164 L 963 1157 L 924 1151 L 880 1147 L 867 1144 L 815 1126 L 803 1120 L 786 1108 L 767 1087 L 757 1071 L 748 1050 L 739 1014 L 734 976 L 734 949 L 738 919 L 748 888 L 757 870 L 770 851 L 799 822 L 820 807 L 845 794 L 864 786 L 885 780 L 897 778 L 933 779 L 957 785 L 1020 808 L 1045 814 L 1077 818 L 1100 817 L 1125 812 L 1146 804 L 1183 783 L 1205 764 L 1222 744 L 1232 729 L 1245 698 L 1250 674 L 1250 645 L 1244 614 L 1256 589 L 1264 562 L 1267 534 L 1266 511 L 1259 473 L 1245 440 L 1231 420 L 1199 384 L 1189 366 L 1184 335 L 1184 285 L 1181 275 L 1164 248 L 1142 225 L 1118 208 L 1096 197 L 1063 184 L 1054 175 L 1036 144 L 1013 115 L 992 97 L 963 80 L 927 69 L 867 61 L 856 57 L 818 35 L 789 25 L 750 20 Z M 781 96 L 779 98 L 759 106 L 745 114 L 719 138 L 704 161 L 690 190 L 688 188 L 688 176 L 693 148 L 698 134 L 709 116 L 724 103 L 744 95 L 756 93 L 772 93 Z"/>
</svg>
`)}`;

const FAQ_ITEMS = [
  {
    label: "Starting Point",
    question: "What are you running toward, not just away from?",
    answer:
      "Capable, self-directed humans who can own their lives. School is the foil, not the mission. The target is a young adult who can function, think, adapt, build relationships, manage health and money, and keep learning without waiting to be managed.",
  },
  {
    label: "Plain English",
    question: "What does ‘floor-complete’ mean?",
    answer:
      "It means the kid can function in the real world. If you dropped them into a new city at 18, they would not panic. They would ask good questions, solve problems, handle money, navigate systems, and keep moving.",
  },
  {
    label: "Common Objection",
    question: "Is this just unschooling with a nicer name?",
    answer:
      "No. The Floor is a real contract, not a vibe. The Domains are a real coverage map, not hand-waving. Kids get increasing ownership, but responsibility never becomes the same thing as absence of structure.",
  },
  {
    label: "How It Fits",
    question: "How do the Why, Floor, By 18, and Domains fit together?",
    answer:
      "The Why names the target. The Floor defines the non-negotiable minimum by 18. By 18 is the plain-language translation of that contract. The Domains are the broader capability map so important areas of life do not get neglected.",
  },
];

export default function App() {
  useEffect(() => {
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = TREE_FAVICON;
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; min-height: 100%; }
        body {
          background: #000;
          color: #111827;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        a { text-decoration: none; }

        .page {
          min-height: 100vh;
          background: #000;
          padding: 12px;
        }

        .shell {
          min-height: calc(100vh - 24px);
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.10);
          background: linear-gradient(180deg, #f4f6f8 0%, #e3e8ed 100%);
          box-shadow: 0 35px 120px -50px rgba(0,0,0,0.7);
        }

        .header {
          background: #000;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          padding: 20px 24px;
          text-align: center;
        }

        .brand {
          margin: 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 5.2vw, 60px);
          font-weight: 500;
          letter-spacing: 0.02em;
          line-height: 1;
        }

        .brand .dotorg {
          color: #cbd5e1;
          margin-left: 6px;
        }

        .hero {
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          gap: 0;
        }

        .hero-copy,
        .hero-art {
          display: flex;
          align-items: center;
        }

        .hero-copy {
          padding: 32px 40px 36px 44px;
          justify-content: center;
        }

        .copy-inner {
          width: 100%;
          max-width: 720px;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.6);
          background: rgba(255,255,255,0.6);
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .hero-title {
          margin: 24px 0 0;
          color: #0f172a;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4.8vw, 66px);
          line-height: 0.98;
          font-weight: 500;
        }

        .hero-text {
          margin: 24px 0 0;
          max-width: 620px;
          color: #334155;
          font-size: clamp(18px, 1.5vw, 22px);
          line-height: 1.75;
        }

        .hero-art {
          justify-content: center;
          padding: 0 28px 36px 12px;
        }

        .art-card {
          width: 100%;
          min-height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          border-radius: 28px;
          border: 1px solid rgba(148,163,184,0.55);
          background: linear-gradient(180deg, #fafbfd 0%, #e9eef3 100%);
          box-shadow: inset 0 2px 20px rgba(15,23,42,0.06);
        }

        .tree-wrap {
          width: 100%;
          color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .tree-wrap svg {
          width: 78%;
          max-width: 520px;
          height: auto;
          display: block;
          margin: 0 auto;
          filter: drop-shadow(0 24px 60px rgba(15,23,42,0.16));
        }

        .why {
          background: #101114;
          color: #fff;
          padding: 48px 56px 56px;
        }

        .why-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 40px;
          align-items: start;
        }

        .why-copy {
          width: 100%;
          max-width: 820px;
        }

        .why-pill {
          display: inline-flex;
          align-items: center;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: #cbd5e1;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .why-title {
          margin: 24px 0 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 3.8vw, 48px);
          line-height: 1.02;
          font-weight: 500;
        }

        .why-text {
          margin: 20px 0 0;
          max-width: 720px;
          color: #cbd5e1;
          font-size: 18px;
          line-height: 1.75;
        }

        .why-button {
          display: inline-flex;
          align-items: center;
          margin-top: 32px;
          padding: 14px 20px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.15);
          background: #fff;
          color: #0f172a;
          font-size: 15px;
          font-weight: 600;
        }

        .why-cards {
          display: grid;
          gap: 16px;
          width: 100%;
        }

        .why-card {
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.05);
          padding: 24px;
        }

        .why-card-label {
          color: #94a3b8;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .why-card-title {
          margin-top: 12px;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 32px;
          line-height: 1.1;
          font-weight: 500;
        }

        .why-card-text {
          margin-top: 12px;
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.8;
        }

        .faq {
          background: linear-gradient(180deg, #eef2f5 0%, #dde3e8 100%);
          color: #0f172a;
          padding: 48px 56px 56px;
        }

        .faq-head {
          max-width: 980px;
        }

        .faq-pill {
          display: inline-flex;
          align-items: center;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(15,23,42,0.12);
          background: rgba(255,255,255,0.55);
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .faq-title {
          margin: 24px 0 0;
          color: #0f172a;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 3.6vw, 46px);
          line-height: 1.04;
          font-weight: 500;
        }

        .faq-text {
          margin: 18px 0 0;
          max-width: 820px;
          color: #334155;
          font-size: 18px;
          line-height: 1.75;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 32px;
        }

        .faq-card {
          border-radius: 26px;
          background: #050608;
          color: #fff;
          padding: 28px;
          box-shadow: 0 24px 60px -40px rgba(0,0,0,0.6);
        }

        .faq-card-label {
          color: #94a3b8;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .faq-card-title {
          margin-top: 14px;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 28px;
          line-height: 1.12;
          font-weight: 500;
        }

        .faq-card-text {
          margin-top: 16px;
          color: #cbd5e1;
          font-size: 16px;
          line-height: 1.8;
        }

        .contact {
          background: #ffffff;
          color: #0f172a;
          padding: 52px 56px 64px;
          border-top: 1px solid rgba(15,23,42,0.08);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
        }

        .contact-pill {
          display: inline-flex;
          align-items: center;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(15,23,42,0.12);
          background: #f8fafc;
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .contact-title {
          margin: 24px 0 0;
          color: #0f172a;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 3.6vw, 46px);
          line-height: 1.04;
          font-weight: 500;
        }

        .contact-text {
          margin: 18px 0 0;
          max-width: 760px;
          color: #334155;
          font-size: 18px;
          line-height: 1.75;
        }

        .contact-copy {
          max-width: 760px;
        }

        .contact-card {
          border-radius: 26px;
          background: #050608;
          color: #fff;
          padding: 28px;
          width: 100%;
        }

        .contact-card-label {
          color: #94a3b8;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .contact-card-line {
          margin-top: 14px;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 28px;
          line-height: 1.2;
          font-weight: 500;
        }

        .contact-card-line a {
          color: #fff;
          text-decoration: none;
        }

        .contact-card-line a:hover {
          text-decoration: underline;
        }

        .contact-card-note {
          margin-top: 14px;
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.8;
        }

        .contact-card-cta {
          margin-top: 22px;
          display: inline-flex;
          align-items: center;
          padding: 12px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .hero,
          .why-grid {
            grid-template-columns: 1fr;
          }

          .hero-copy {
            padding: 40px 32px 24px;
          }

          .hero-art {
            padding: 0 32px 40px;
          }

          .art-card {
            min-height: 0;
          }

          .tree-wrap svg {
            width: 84%;
            max-width: 520px;
          }

          .why {
            padding: 40px 32px 48px;
          }

          .faq {
            padding: 40px 32px 48px;
          }

          .faq-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .contact {
            padding: 40px 32px 48px;
          }
        }

        @media (max-width: 640px) {
          .page {
            padding: 8px;
          }

          .shell {
            min-height: calc(100vh - 16px);
            border-radius: 24px;
          }

          .header {
            padding: 20px 16px;
          }

          .hero-copy {
            padding: 28px 20px 20px;
          }

          .hero-art {
            padding: 0 20px 28px;
          }

          .art-card {
            padding: 20px;
            border-radius: 22px;
          }

          .why {
            padding: 28px 20px 32px;
          }

          .faq {
            padding: 28px 20px 32px;
          }

          .faq-card,
          .contact-card {
            padding: 22px;
          }

          .faq-card-title,
          .contact-card-line {
            font-size: 24px;
          }

          .contact {
            padding: 28px 20px 36px;
          }

          .why-card-title {
            font-size: 26px;
          }

          .why-text {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="page">
        <div className="shell">
          <header className="header">
            <h1 className="brand">
              LifeEducation<span className="dotorg">.org</span>
            </h1>
          </header>

          <div className="hero">
            <section className="hero-copy">
              <div className="copy-inner">
                <div className="pill">LifeEducation</div>

                <h2 className="hero-title">
                  If you dropped them off in a strange city on a different continent, could they figure it out?
                </h2>

                <p className="hero-text">
                  Too much of the current system still rewards compliance, paper performance, and waiting to be told what matters. We want something better: young adults who can think, adapt, solve problems, and function in real life.
                </p>
              </div>
            </section>

            <section className="hero-art">
              <div className="art-card">
                <div className="tree-wrap">
                  <svg viewBox="0 0 1288 1632" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path
                      d="M 686 1498 L 684 1502 L 685 1508 L 691 1509 L 693 1506 Z M 655 1139 L 647 1139 L 643 1141 L 629 1155 L 614 1183 L 603 1216 L 594 1270 L 594 1307 L 599 1339 L 599 1360 L 596 1374 L 581 1401 L 533 1456 L 525 1477 L 521 1499 L 522 1522 L 534 1575 L 537 1577 L 540 1568 L 541 1501 L 546 1483 L 560 1459 L 570 1448 L 572 1448 L 587 1486 L 588 1503 L 584 1525 L 587 1526 L 591 1522 L 600 1505 L 603 1488 L 596 1455 L 596 1433 L 599 1422 L 605 1410 L 617 1393 L 645 1446 L 654 1478 L 654 1492 L 651 1511 L 637 1552 L 633 1573 L 634 1593 L 638 1605 L 642 1611 L 644 1610 L 645 1587 L 648 1573 L 654 1556 L 673 1515 L 682 1487 L 684 1487 L 693 1496 L 703 1509 L 712 1529 L 715 1546 L 715 1564 L 713 1573 L 714 1593 L 717 1591 L 726 1572 L 731 1552 L 730 1526 L 721 1500 L 704 1469 L 662 1404 L 650 1377 L 644 1358 L 638 1322 L 638 1292 L 644 1262 L 652 1240 L 672 1272 L 702 1303 L 716 1324 L 720 1336 L 720 1357 L 716 1385 L 716 1407 L 722 1432 L 735 1454 L 761 1483 L 775 1502 L 785 1523 L 791 1550 L 795 1559 L 798 1554 L 799 1544 L 798 1518 L 790 1493 L 777 1471 L 752 1439 L 743 1419 L 741 1409 L 741 1385 L 744 1369 L 748 1369 L 762 1390 L 779 1407 L 797 1437 L 799 1434 L 795 1409 L 773 1367 L 755 1318 L 741 1295 L 712 1258 L 698 1235 L 683 1203 L 666 1153 L 661 1144 Z M 564 21 L 534 21 L 499 27 L 472 37 L 428 61 L 362 71 L 342 77 L 316 89 L 291 107 L 277 121 L 263 139 L 236 182 L 221 191 L 186 206 L 148 234 L 128 256 L 117 273 L 110 288 L 99 322 L 93 373 L 90 383 L 83 393 L 59 419 L 36 455 L 27 479 L 20 518 L 20 545 L 24 571 L 32 595 L 42 615 L 36 649 L 36 673 L 42 699 L 57 732 L 67 746 L 92 773 L 114 790 L 138 803 L 171 814 L 196 818 L 232 818 L 273 811 L 338 787 L 374 777 L 406 775 L 436 779 L 460 787 L 481 797 L 511 818 L 532 840 L 547 863 L 555 880 L 563 906 L 568 941 L 568 968 L 562 1016 L 555 1047 L 549 1065 L 541 1081 L 532 1094 L 511 1114 L 493 1126 L 474 1135 L 427 1149 L 329 1161 L 304 1168 L 259 1185 L 207 1189 L 179 1195 L 156 1205 L 117 1231 L 88 1241 L 91 1244 L 97 1245 L 121 1244 L 136 1240 L 179 1218 L 206 1212 L 244 1213 L 246 1215 L 214 1260 L 200 1272 L 160 1294 L 133 1313 L 113 1321 L 99 1323 L 96 1325 L 99 1328 L 109 1330 L 133 1328 L 195 1301 L 199 1302 L 196 1327 L 188 1352 L 175 1374 L 150 1396 L 150 1399 L 154 1400 L 161 1398 L 177 1389 L 196 1371 L 206 1355 L 237 1281 L 257 1255 L 298 1217 L 323 1204 L 347 1198 L 396 1197 L 413 1199 L 375 1246 L 362 1259 L 343 1270 L 295 1289 L 279 1302 L 268 1317 L 260 1333 L 255 1349 L 238 1387 L 243 1387 L 257 1372 L 282 1334 L 300 1316 L 316 1308 L 358 1294 L 361 1295 L 360 1308 L 353 1336 L 349 1347 L 337 1368 L 314 1392 L 279 1418 L 262 1435 L 253 1447 L 245 1465 L 244 1485 L 245 1489 L 247 1490 L 265 1456 L 291 1434 L 301 1428 L 303 1430 L 303 1480 L 296 1503 L 287 1518 L 290 1520 L 305 1509 L 315 1493 L 320 1473 L 323 1441 L 327 1427 L 334 1414 L 358 1388 L 373 1366 L 384 1341 L 397 1287 L 411 1262 L 435 1236 L 454 1221 L 470 1211 L 521 1186 L 542 1173 L 543 1175 L 529 1206 L 515 1226 L 487 1259 L 471 1283 L 462 1301 L 454 1329 L 447 1343 L 434 1362 L 397 1403 L 385 1424 L 381 1436 L 378 1457 L 382 1522 L 376 1555 L 381 1552 L 388 1542 L 396 1522 L 398 1501 L 398 1462 L 400 1449 L 406 1432 L 413 1421 L 426 1407 L 455 1383 L 458 1385 L 468 1423 L 468 1454 L 463 1472 L 447 1505 L 442 1525 L 442 1543 L 445 1556 L 449 1564 L 456 1571 L 456 1535 L 459 1521 L 464 1509 L 484 1475 L 491 1452 L 491 1418 L 484 1374 L 484 1355 L 489 1329 L 499 1307 L 507 1296 L 514 1290 L 530 1342 L 531 1375 L 529 1390 L 531 1390 L 541 1372 L 547 1347 L 546 1324 L 541 1299 L 541 1279 L 543 1269 L 549 1252 L 584 1184 L 596 1151 L 606 1111 L 613 1046 L 612 949 L 605 882 L 592 835 L 572 790 L 556 765 L 539 744 L 514 720 L 486 700 L 459 687 L 436 679 L 391 670 L 349 669 L 317 674 L 301 679 L 273 692 L 247 707 L 226 714 L 196 714 L 175 705 L 161 693 L 156 685 L 157 684 L 184 693 L 201 693 L 224 687 L 285 651 L 284 639 L 264 620 L 242 607 L 222 605 L 178 609 L 160 606 L 146 600 L 136 593 L 120 574 L 114 559 L 113 544 L 115 543 L 129 562 L 139 572 L 153 580 L 165 582 L 185 582 L 206 580 L 223 575 L 223 571 L 216 562 L 209 547 L 202 521 L 198 494 L 187 470 L 170 453 L 138 436 L 140 433 L 147 432 L 170 433 L 179 436 L 199 447 L 213 461 L 222 478 L 226 490 L 237 541 L 244 559 L 270 587 L 291 605 L 314 620 L 345 632 L 364 635 L 422 639 L 456 646 L 484 657 L 489 656 L 486 642 L 469 591 L 456 568 L 444 555 L 428 546 L 419 544 L 400 545 L 364 554 L 342 553 L 328 548 L 311 534 L 300 518 L 298 511 L 299 509 L 319 525 L 338 532 L 354 532 L 385 524 L 385 521 L 356 500 L 342 486 L 332 467 L 322 429 L 312 414 L 300 407 L 276 400 L 237 383 L 222 371 L 213 360 L 209 352 L 205 333 L 205 318 L 207 303 L 211 292 L 213 291 L 218 316 L 223 331 L 234 348 L 245 359 L 257 365 L 286 372 L 321 385 L 326 378 L 329 366 L 330 352 L 327 339 L 317 327 L 292 317 L 291 314 L 298 310 L 308 309 L 328 312 L 341 322 L 349 338 L 351 355 L 351 428 L 355 444 L 366 466 L 374 475 L 391 486 L 428 500 L 451 512 L 464 522 L 480 539 L 489 552 L 499 573 L 523 648 L 540 682 L 567 715 L 594 742 L 616 770 L 619 770 L 620 745 L 616 698 L 615 646 L 610 603 L 599 563 L 575 511 L 555 480 L 534 458 L 523 450 L 499 437 L 469 427 L 454 420 L 432 403 L 416 377 L 400 305 L 388 271 L 377 250 L 360 230 L 349 224 L 338 221 L 322 222 L 317 224 L 314 223 L 323 213 L 342 206 L 364 207 L 380 214 L 394 226 L 404 240 L 414 261 L 418 275 L 421 278 L 446 250 L 454 235 L 459 217 L 459 192 L 457 182 L 451 168 L 439 155 L 429 149 L 406 143 L 404 140 L 412 136 L 431 135 L 448 139 L 464 149 L 473 159 L 482 179 L 486 199 L 486 220 L 482 237 L 475 252 L 450 288 L 440 311 L 438 322 L 438 342 L 443 365 L 451 380 L 463 390 L 482 400 L 513 409 L 515 407 L 515 402 L 510 383 L 509 371 L 511 343 L 516 326 L 521 316 L 534 301 L 535 307 L 530 331 L 529 356 L 531 379 L 540 413 L 558 440 L 591 472 L 600 485 L 608 503 L 610 503 L 613 495 L 616 465 L 619 398 L 617 239 L 615 225 L 609 212 L 592 192 L 571 148 L 564 138 L 545 122 L 530 116 L 515 113 L 514 111 L 526 106 L 549 105 L 570 113 L 586 129 L 598 151 L 610 181 L 615 186 L 618 175 L 620 134 L 630 58 L 618 42 L 604 33 L 581 24 Z M 723 21 L 709 24 L 694 30 L 675 46 L 662 70 L 655 93 L 649 131 L 645 191 L 648 315 L 651 341 L 655 353 L 659 352 L 702 287 L 725 262 L 742 251 L 764 243 L 789 239 L 800 232 L 804 222 L 807 196 L 813 175 L 818 166 L 832 152 L 847 145 L 867 144 L 885 148 L 896 158 L 867 157 L 858 159 L 846 165 L 838 173 L 831 189 L 828 233 L 824 247 L 820 254 L 809 263 L 764 276 L 749 285 L 736 298 L 717 324 L 675 395 L 660 441 L 655 469 L 651 508 L 651 582 L 655 626 L 661 657 L 665 657 L 673 652 L 711 611 L 727 588 L 741 556 L 745 536 L 745 514 L 735 456 L 735 431 L 742 410 L 753 394 L 767 379 L 775 374 L 780 375 L 762 403 L 757 426 L 759 456 L 765 475 L 771 485 L 831 442 L 844 429 L 856 412 L 864 381 L 865 314 L 869 287 L 880 264 L 900 244 L 912 236 L 924 231 L 949 229 L 956 232 L 954 235 L 931 244 L 919 253 L 905 271 L 900 282 L 894 307 L 894 372 L 891 396 L 885 414 L 886 419 L 898 419 L 923 412 L 937 406 L 945 400 L 952 390 L 960 373 L 968 343 L 977 323 L 987 309 L 1001 295 L 1013 287 L 1032 281 L 1050 283 L 1068 292 L 1083 309 L 1082 310 L 1073 305 L 1060 301 L 1044 301 L 1026 309 L 1014 320 L 1001 338 L 993 356 L 982 395 L 971 414 L 959 427 L 945 436 L 930 442 L 885 455 L 846 472 L 818 491 L 799 510 L 784 535 L 768 583 L 754 615 L 736 644 L 707 683 L 694 707 L 685 733 L 680 754 L 676 786 L 676 812 L 680 813 L 686 807 L 713 772 L 730 755 L 779 717 L 809 688 L 822 668 L 838 637 L 850 605 L 868 567 L 885 541 L 906 520 L 923 509 L 950 499 L 970 496 L 1007 496 L 1030 491 L 1045 483 L 1059 470 L 1067 458 L 1072 444 L 1077 396 L 1081 382 L 1085 375 L 1095 365 L 1100 364 L 1101 368 L 1093 386 L 1092 446 L 1086 470 L 1076 489 L 1062 503 L 1039 517 L 1038 520 L 1046 525 L 1060 529 L 1080 529 L 1097 522 L 1143 488 L 1161 483 L 1172 484 L 1180 489 L 1177 492 L 1158 497 L 1145 503 L 1099 543 L 1088 549 L 1074 553 L 1046 552 L 985 532 L 961 531 L 942 536 L 927 545 L 911 560 L 897 582 L 885 607 L 859 675 L 881 671 L 898 671 L 936 677 L 953 676 L 973 667 L 1037 620 L 1059 611 L 1071 610 L 1087 613 L 1104 620 L 1116 628 L 1129 640 L 1131 644 L 1130 647 L 1113 641 L 1093 637 L 1076 637 L 1052 642 L 1045 645 L 1030 656 L 996 691 L 984 701 L 989 706 L 1011 717 L 1041 728 L 1063 729 L 1084 723 L 1083 728 L 1073 739 L 1061 747 L 1050 751 L 1028 752 L 1005 746 L 956 722 L 939 717 L 924 715 L 878 716 L 858 720 L 839 727 L 817 738 L 798 751 L 780 766 L 749 799 L 734 820 L 716 854 L 702 894 L 694 930 L 691 964 L 696 1121 L 700 1150 L 720 1214 L 733 1238 L 759 1263 L 782 1280 L 814 1309 L 823 1322 L 825 1331 L 825 1359 L 817 1420 L 818 1444 L 826 1468 L 849 1502 L 856 1517 L 861 1538 L 862 1563 L 864 1564 L 867 1562 L 870 1555 L 873 1542 L 872 1516 L 868 1504 L 848 1467 L 843 1448 L 844 1415 L 851 1386 L 854 1385 L 863 1397 L 894 1428 L 913 1444 L 931 1467 L 941 1491 L 943 1531 L 947 1545 L 949 1545 L 952 1537 L 958 1508 L 959 1490 L 956 1472 L 952 1461 L 939 1438 L 924 1419 L 892 1385 L 882 1371 L 864 1338 L 854 1314 L 837 1284 L 766 1214 L 758 1182 L 760 1180 L 799 1197 L 833 1216 L 837 1216 L 875 1251 L 889 1270 L 901 1291 L 915 1330 L 926 1352 L 938 1369 L 978 1409 L 990 1430 L 1005 1468 L 1013 1479 L 1022 1487 L 1023 1483 L 1015 1464 L 1007 1424 L 1003 1413 L 1006 1412 L 1012 1414 L 1041 1432 L 1054 1445 L 1068 1469 L 1071 1471 L 1070 1453 L 1065 1438 L 1057 1425 L 1044 1412 L 1021 1396 L 993 1382 L 975 1367 L 961 1350 L 950 1332 L 937 1299 L 941 1298 L 959 1302 L 1000 1316 L 1017 1328 L 1033 1344 L 1047 1362 L 1053 1366 L 1051 1355 L 1039 1329 L 1024 1308 L 1012 1298 L 997 1290 L 953 1274 L 932 1262 L 897 1223 L 868 1195 L 937 1195 L 952 1197 L 978 1205 L 1005 1220 L 1031 1243 L 1049 1265 L 1066 1292 L 1078 1320 L 1095 1350 L 1117 1372 L 1125 1377 L 1146 1385 L 1156 1384 L 1128 1363 L 1111 1342 L 1099 1312 L 1096 1291 L 1100 1290 L 1109 1292 L 1177 1315 L 1193 1316 L 1196 1315 L 1197 1312 L 1191 1308 L 1170 1300 L 1136 1280 L 1091 1260 L 1080 1250 L 1051 1211 L 1066 1208 L 1099 1209 L 1127 1218 L 1155 1233 L 1169 1238 L 1186 1240 L 1201 1238 L 1203 1235 L 1175 1226 L 1137 1202 L 1108 1190 L 1079 1185 L 1033 1182 L 1019 1178 L 987 1164 L 963 1157 L 924 1151 L 880 1147 L 867 1144 L 815 1126 L 803 1120 L 786 1108 L 767 1087 L 757 1071 L 748 1050 L 739 1014 L 734 976 L 734 949 L 738 919 L 748 888 L 757 870 L 770 851 L 799 822 L 820 807 L 845 794 L 864 786 L 885 780 L 897 778 L 933 779 L 957 785 L 1020 808 L 1045 814 L 1077 818 L 1100 817 L 1125 812 L 1146 804 L 1183 783 L 1205 764 L 1222 744 L 1232 729 L 1245 698 L 1250 674 L 1250 645 L 1244 614 L 1256 589 L 1264 562 L 1267 534 L 1266 511 L 1259 473 L 1245 440 L 1231 420 L 1199 384 L 1189 366 L 1184 335 L 1184 285 L 1181 275 L 1164 248 L 1142 225 L 1118 208 L 1096 197 L 1063 184 L 1054 175 L 1036 144 L 1013 115 L 992 97 L 963 80 L 927 69 L 867 61 L 856 57 L 818 35 L 789 25 L 750 20 Z M 781 96 L 779 98 L 759 106 L 745 114 L 719 138 L 704 161 L 690 190 L 688 188 L 688 176 L 693 148 L 698 134 L 709 116 L 724 103 L 744 95 L 756 93 L 772 93 Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </section>
          </div>

          <section className="why">
            <div className="why-grid">
              <div className="why-copy">
                <div className="why-pill">The Why</div>

                <h3 className="why-title">Most education talk starts in the wrong place.</h3>

                <p className="why-text">
                  It starts with school. Or curriculum. Or standards. Or credentials. LifeEducation starts with a harder and more useful question: what should an 18-year-old actually be able to do, on their own, in real life?
                </p>

                <p className="why-text">
                  This is not about tweaking school around the edges. It is about naming a better target and building around that target directly. The goal is not paper success. The goal is real capability, judgment, autonomy, and a life rich enough that those things become normal.
                </p>

                <a
                  className="why-button"
                  href="https://docs.google.com/document/d/1iMa_sLEphCEfCAyG_JGlHgeNCwZRda5j/edit?usp=sharing&ouid=112063937930878626054&rtpof=true&sd=true"
                >
                  Read the Why Statement
                </a>
              </div>

              <div className="why-cards">
                <div className="why-card">
                  <div className="why-card-label">Target</div>
                  <div className="why-card-title">The Floor is the contract.</div>
                  <div className="why-card-text">
                    Minimum adulthood capability by 18. Serious, non-negotiable, and not disguised curriculum theater.
                  </div>
                </div>

                <div className="why-card">
                  <div className="why-card-label">Priorities</div>
                  <div className="why-card-title">Agency. Capability. Optionality.</div>
                  <div className="why-card-text">
                    Integrity, Health, and Belonging complete the set. The system exists to serve those six priorities, not replace them.
                  </div>
                </div>

                <div className="why-card">
                  <div className="why-card-label">Shape</div>
                  <div className="why-card-title">Light on purpose.</div>
                  <div className="why-card-text">
                    The point is not to turn family life into school at home. The point is a better target, clearer guardrails, and a life where real things happen on purpose.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="faq">
            <div className="faq-head">
              <div className="faq-pill">Q&amp;A</div>
              <h3 className="faq-title">The obvious questions are worth asking.</h3>
              <p className="faq-text">
                The Why is the main public piece. The Q&amp;A exists to make the position plain, pressure-test the obvious objections, and keep the big distinctions clean.
              </p>
            </div>

            <div className="faq-grid">
              {FAQ_ITEMS.map((item) => (
                <div className="faq-card" key={item.question}>
                  <div className="faq-card-label">{item.label}</div>
                  <div className="faq-card-title">{item.question}</div>
                  <div className="faq-card-text">{item.answer}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="contact">
            <div className="contact-grid">
              <div className="contact-copy">
                <div className="contact-pill">Contact</div>
                <h3 className="contact-title">Thoughts, objections, and better ideas are welcome.</h3>
                <p className="contact-text">
                  Serious feedback is useful. If something here resonates, breaks, or raises a real question, send it. This project gets sharper when it is pressure-tested.
                </p>
                <p className="contact-text">
                  This section is set up for a public contact point now, with room for a simple form later if it ever earns its place. For now, direct email is enough.
                </p>
              </div>

              <div className="contact-card">
                <div className="contact-card-label">Public contact</div>
                <div className="contact-card-line">
                  <a href="mailto:LifeEducationInformation@gmail.com">LifeEducationInformation@gmail.com</a>
                </div>
                <div className="contact-card-note">
                  Use this address for thoughts, objections, ideas, examples, or serious feedback.
                </div>
                <a className="contact-card-cta" href="mailto:LifeEducationInformation@gmail.com?subject=LifeEducation%20Website%20Feedback">
                  Email your thoughts
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
