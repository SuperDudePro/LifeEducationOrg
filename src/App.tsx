export default function App() {
  return (
    <div className="min-h-screen bg-black px-3 py-3 md:px-4 md:py-4">
      <div className="min-h-[calc(100vh-24px)] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#f4f6f8_0%,#e3e8ed_100%)] shadow-[0_35px_120px_-50px_rgba(0,0,0,0.7)] md:min-h-[calc(100vh-32px)]">
        <header className="rounded-t-[2rem] border-b border-white/10 bg-black px-6 py-7 md:px-10 md:py-8">
          <div className="text-center font-serif text-4xl tracking-[0.02em] text-white md:text-6xl lg:text-7xl">
            LifeEducation<span className="ml-1 text-slate-300">.org</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <section className="flex items-center px-8 py-12 md:px-12 lg:px-16 xl:px-20">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-slate-400/60 bg-white/60 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] text-slate-600">
                LifeEducation
              </div>

              <h1 className="font-serif text-4xl leading-[0.98] text-slate-950 md:text-6xl xl:text-7xl">
                If you dropped them off in a strange city on a different continent, could they figure it out?
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-700 md:text-xl">
                Too much of the current system still rewards compliance, paper performance, and waiting to be told what matters. We want something better: young adults who can think, adapt, solve problems, and function in real life.
              </p>
            </div>
          </section>

          <section className="flex items-center justify-center px-8 pb-12 pt-0 md:px-12 lg:px-10 lg:py-12 xl:px-16">
            <div className="flex h-full w-full items-center justify-center rounded-[1.75rem] border border-slate-300/70 bg-[linear-gradient(180deg,#fafbfd_0%,#e9eef3_100%)] p-6 shadow-inner md:p-8 lg:min-h-[720px]">
              <div className="w-full max-w-[620px] overflow-hidden text-black">
                <svg
                  viewBox="0 0 1288 1632"
                  className="block h-auto w-full drop-shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
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

        <section className="bg-[#101114] px-8 py-14 text-white md:px-12 md:py-16 lg:px-16 xl:px-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] text-slate-300">
                The Why
              </div>

              <h2 className="font-serif text-3xl leading-[1.02] text-white md:text-5xl">
                Most education talk starts in the wrong place.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                It starts with school. Or curriculum. Or standards. Or credentials. LifeEducation starts with a harder and more useful question: what should an 18-year-old actually be able to do, on their own, in real life?
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                This is not about tweaking school around the edges. It is about naming a better target and building around that target directly. The goal is not paper success. The goal is real capability, judgment, autonomy, and a life rich enough that those things become normal.
              </p>

              <a
                href="https://docs.google.com/document/d/1iMa_sLEphCEfCAyG_JGlHgeNCwZRda5j/edit?usp=sharing&ouid=112063937930878626054&rtpof=true&sd=true"
                className="mt-8 inline-flex items-center rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5"
              >
                Read the Why Statement
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <div className="text-[11px] font-semibold tracking-[0.08em] text-slate-400">Target</div>
                <div className="mt-3 font-serif text-2xl text-white">The Floor is the contract.</div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Minimum adulthood capability by 18. Serious, non-negotiable, and not disguised curriculum theater.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <div className="text-[11px] font-semibold tracking-[0.08em] text-slate-400">Priorities</div>
                <div className="mt-3 font-serif text-2xl text-white">Agency. Capability. Optionality.</div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Integrity, Health, and Belonging complete the set. The system exists to serve those six priorities, not replace them.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <div className="text-[11px] font-semibold tracking-[0.08em] text-slate-400">Shape</div>
                <div className="mt-3 font-serif text-2xl text-white">Light on purpose.</div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The point is not to turn family life into school at home. The point is a better target, clearer guardrails, and a life where real things happen on purpose.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
